import {Map} from "@purtuga/common/src/jsutils/Map.js"
import {domInsertBefore} from "@purtuga/common/src/domutils/domInsertBefore.js"
import {
    arraySplice,
    isArray,
    objectKeys
} from "@purtuga/common/src/jsutils/runtime-aliases.js"
import Directive from "./Directive.js"
import {
    arrayForEach,
    createComment,
    createValueGetter,
    DOM_DATA_BIND_PROP,
    getAttribute,
    hasAttribute,
    isPureObject,
    PRIVATE,
    removeAttribute,
    removeChild
} from "../utils"

import {render} from "../render.js";
import {view} from "../view.js";
import {NodeHandler} from "./NodeHandler.js";

//============================================
const EACH = Symbol("directive.each.setup");
const DIRECTIVE     = "_each";
const KEY_DIRECTIVE = "_key";
const destroyBinder = binder => binder._destroy();
const defaultRowKey = data => data;
const isEmptyList   = list => (isArray(list) && !list.length) || (isPureObject(list) && !objectKeys(list).length);

class EachDirectiveNodeHandler extends NodeHandler {

    binders = [];

    bindersByKey = new Map();

    listIterator = () => this._directive.iterateOverList(this, PRIVATE.get(this).value);

    init(directive, node, directives) {
        super.init(directive, node, directives);
        this._placeholderEle = createComment("directive.each");
        this._isSoleChild = hasDedicatedParent(this._node);

        // create the template for the row content, which is stored in the Comment node data
        this._viewTemplate = view(node.data, directives);
        if (!this._viewTemplate[EACH]) {
            setupViewTemplate(this._viewTemplate);
        }

        domInsertBefore(this._placeholderEle, node);
        removeChild(node.parentNode, node);
    }


    update(newList) {
        const state = PRIVATE.get(this);

        if (newList !== state.value) {
            state.value = null;

            if (this.listIterator.stopWatchingAll) {
                this.listIterator.stopWatchingAll();
            }
        }

        if (!newList) {
            this._directive.destroyChildBinders(this.binders, this);
            return;
        }

        state.value = newList;

        if (isEmptyList(newList) && this.binders) {
            this._directive.destroyChildBinders(this.binders, this);
        }
        else {
            this.listIterator();
        }
    }

    destroy() {
        // Support for Observables
        if (this.listIterator.stopWatchingAll) {
            this.listIterator.stopWatchingAll();
        }
        this.bindersByKey.clear();
        this._directive.destroyChildBinders(this.binders, this);
        super.destroy();
    }
}


/**
 * Directive to loop through an array or object. In addition, it also support an
 * internal binding directive called `b:key`
 *
 * @class EachDirective
 * @extends Directive
 *
 * @example
 *
 * // Use with array:
 * _each="item of arrayList"
 * _each="(item, index) of arrayList"
 *
 * // Use with Object
 * _each="value of objectList"
 * _each="(value, key) of objectList"
 */
export class EachDirective extends Directive {
    static NodeHandlerConstructor = EachDirectiveNodeHandler;

    static has(ele) {
        return hasAttribute(ele, DIRECTIVE) ? DIRECTIVE : "";
    }

    static manages() { return true; }

    init(attr, attrValue) {
        const [ iteratorArgs, listVar ] = parseDirectiveValue((attrValue || "").trim());
        this._attr              = attr;
        this._iteratorArgs      = iteratorArgs;
        this._tokenValueGetter  = createValueGetter((listVar || ""), "each");
    }

    /**
     * Destroy the binder instances and remove Elements from DOM.
     *
     * @param binders
     * @param handler
     */
    destroyChildBinders(binders, handler) {
        if (!binders || !binders.length) {
            return;
        }

        binders = binders.splice(0);

        if (handler._isSoleChild) { // Supper fast way to just clear the UI
            const parentEle = handler._placeholderEle.parentNode;
            parentEle.textContent = "";
            parentEle.appendChild(handler._placeholderEle);
            setTimeout(() => {
                arrayForEach(binders, binder => binder._destroy());
            });
        }
        else {
            arrayForEach(binders, binder => binder._destroy());
        }
    }

    /**
     * Returns an object (`dataObj` if provided on input) with additional keys - each
     * one being the argNames that the user defined in their HTML `_each` template.
     *
     * It essentially matches up two array by using the keys from one array and mapping to
     * values from the second array at exactly the same location.
     * Example:
     *
     *      _each="item in arrayList"
     *      arrayList = [ "value 1" ]
     *
     *      // Array Keys           // Array values             // result: object
     *      // Defined in the       // Data in actual           // Matches the key
     *      // template             // Array                    // to the data
     *      //-------------------   //-----------------         //---------------------
     *      [                       [                   ===     {
     *          "item"                  "value 1"       ===         item: "value1"
     *      ]                       ]                   ===     }
     *
     * @param {Array} values
     * @param {Object} [dataObj]
     *
     * @returns {Object}
     */
    getDataForIteration(values, dataObj) {
        return this._iteratorArgs.reduce(
            (rowData, argName) => {
                rowData[argName] = values.shift();
                return rowData;
            },
            dataObj || {}
        );
    }

    /**
     * Iterates over a new set (list) and eitehr updates or builds out new elements for each item
     * in that list.
     *
     * @param handler
     * @param newData
     */
    iterateOverList(handler, newData) {
        /** @type NodeHandlerState */
        const state = PRIVATE.get(handler);
        let isDataArray             = isArray(newData);
        let iterationDataList;


        if (isDataArray) {
            isDataArray = true;
            iterationDataList = newData;
        }
        else if (isPureObject(newData)) {
            iterationDataList = objectKeys(newData);
        } else {
            return;
        }

        const currentBinders        = handler.binders;
        const binderToBeDestroyed   = new Map();    // Will be recycled
        const totalItems            = iterationDataList.length;
        const { usesKey, getKey }   = handler._viewTemplate[EACH];

        // Loop through each piece of data and build a DOM binder for it.
        // The data should be in sync with `currentBinders`
        for (let i = 0; i < totalItems; i++) {
            let rowData = { // FIXME: can this object creation be avoided? For Arrays - it should be possible. Objects - not sure.
                $root: state.data.$root || state.data,
                $parent: state.data,
                $data: state.data.$data || state.data
            };

            // Adjust the rowData to have the `key` and/or `value` and `index` as top level items
            // These are added to the rowData object just created above.
            if (isDataArray) {
                this.getDataForIteration([ iterationDataList[i], i ], rowData);
            }
            else {
                this.getDataForIteration([ newData[ iterationDataList[i] ], iterationDataList[i], i ], rowData);
            }

            const rowKey = getKey(
                usesKey
                    ? rowData                               // => Use rowData created above - getKey() will run a value getter on it.
                    : isDataArray
                        ? iterationDataList[i]              // => Use the object from the newData
                        : newData[ iterationDataList[i] ]   // => Use the Object key
            );

            // If a binder currently exists, then see if it is the one previously
            // created for this row's data
            if (currentBinders[i] && currentBinders[i]._loop.rowKey === rowKey) {
                currentBinders[i][DOM_DATA_BIND_PROP].setData(rowData);
                continue;
            }

            // If there is a binder at the current position, then its not the one need.
            // move it to the `to be destroyed` list.
            if (currentBinders[i]) {
                currentBinders[i][DOM_DATA_BIND_PROP].recover();
                binderToBeDestroyed.set(
                    currentBinders[i]._loop.rowKey,
                    currentBinders[i]
                );
                currentBinders[i] = null;
            }

            // Do we have a rowBinder for this data item in the existing list,
            // but perhaps at a different location? Get it and move it to the new position.
            // Old position in the existing array is set to null (avoids mutating array)
            let binder = handler.bindersByKey.get(rowKey);

            if (binder) {
                if (binder._loop.pos !== null && currentBinders[binder._loop.pos] === binder) {
                    currentBinders[binder._loop.pos] = null;
                }
            } else {
                binder = binderToBeDestroyed.get(rowKey);

                if (binder) {
                    binderToBeDestroyed.delete(rowKey);
                }
            }

            if (binder) {
                currentBinders[i] = binder;
                binder._loop.pos = i;
                currentBinders[i][DOM_DATA_BIND_PROP].recover();
                positionRowInDom(currentBinders, i, handler._placeholderEle);
                currentBinders[i][DOM_DATA_BIND_PROP].setData(rowData);
                continue;
            }

            // Create new binder
            // First check if we can recycle one that is tagged to be destroyed.
            // if not, then create a new one.
            if (binderToBeDestroyed.size) {
                const [recycleBinderKey, recycleBinder] = binderToBeDestroyed.entries().next().value;
                binder = recycleBinder;
                binder[DOM_DATA_BIND_PROP].setData(rowData);
                binderToBeDestroyed.delete(recycleBinderKey);
                binder._loop.rowKey = rowKey;
                binder._loop.pos = i;
            } else {
                binder = render(handler._viewTemplate, rowData, handler._directives);
                binder._destroy = destroyRowElement;
                binder._handler = handler; // needed by destroyRowElement()
                binder._loop  = { rowKey, pos: i };
            }

            currentBinders[i] = binder;
            handler.bindersByKey.set(rowKey, binder);
            positionRowInDom(currentBinders, i, handler._placeholderEle);
        }

        // Destroy binders that were not used
        if (binderToBeDestroyed.size) {
            arrayForEach(binderToBeDestroyed.values(), destroyBinder);
            binderToBeDestroyed.clear();
        }

        // remove any left over items in currentBinders where is no longer part of newData
        if (totalItems < currentBinders.length) {
            arrayForEach(arraySplice(currentBinders, totalItems), destroyBinder);
        }
    }
}

function setupViewTemplate (viewTemplate) {
    if (!viewTemplate[EACH]) {
        viewTemplate[EACH] = {
            usesKey: false,
            getKey: defaultRowKey
        };
        const firstChildNode = viewTemplate.ele.content.firstChild;

        if (
            firstChildNode &&
            firstChildNode.hasAttribute &&
            hasAttribute(firstChildNode, KEY_DIRECTIVE)
        ) {
            viewTemplate[EACH].usesKey = true;
            viewTemplate[EACH].getKey = createValueGetter(getAttribute(firstChildNode, KEY_DIRECTIVE), "each.key");
            removeAttribute(firstChildNode, KEY_DIRECTIVE);
        }
    }
}


function positionRowInDom(currentBinders, binderIndex, defaultInsertMarkerElement) {
    const binder = currentBinders[binderIndex];

    // Get all original nodes from binder back to the DocumentFragment
    binder[DOM_DATA_BIND_PROP].recover();

    // If we have a binder after this one, then do an insertBefore using the first node of the nextSibling
    if (currentBinders[binderIndex + 1]) {
        domInsertBefore(binder, currentBinders[binderIndex + 1][DOM_DATA_BIND_PROP]._childNodes[0]);
    } else {
        // Just place the binder before the marker
        domInsertBefore(binder, defaultInsertMarkerElement);
    }
}

function destroyRowElement () {
    // remove all elements/nodes of this row from DOM
    this[DOM_DATA_BIND_PROP].recover();

    if (this._loop.rowKey) {
        this._handler.bindersByKey.delete(this._loop.rowKey);
    }

    this[DOM_DATA_BIND_PROP].destroy();
}

function parseDirectiveValue(attrValue) {
    let matches = /\(?(.+?)\)?\W?(?:of|in)\W(.*)/.exec(attrValue);
    if (matches) {
        matches = matches.slice(1);
        matches[0] = matches[0].split(/,/).map(argName => String(argName).trim());
        return matches;
    }
    return [];
}

function hasDedicatedParent(node) {
    return Array.prototype.every.call(node.parentNode.childNodes, childNode => {
        return childNode === node || (childNode.nodeType === 3 && !childNode.textContent.trim());
    });
}


export default EachDirective;
