import Map from "@purtuga/common/src/jsutils/es6-Map"
import {domInsertBefore} from "@purtuga/common/src/domutils/domInsertBefore.js"
import {arraySplice} from "@purtuga/common/src/jsutils/runtime-aliases.js"
import {
    makeObservable,
    objectWatchProp,
    unsetDependencyTracker
} from "@purtuga/observables/src/objectWatchProp"
import {arrayWatch} from "@purtuga/observables/src/arrayWatch"
import Directive from "./Directive"
import {
    arrayForEach,
    createComment,
    createValueGetter,
    DOM_DATA_BIND_PROP,
    getAttribute,
    hasAttribute,
    insertBefore,
    isPureObject,
    PRIVATE,
    removeAttribute,
    removeChild
} from "../utils"

import {render} from "../render";
import {view} from "../view.js";

//============================================
const EACH = Symbol("directive.each.setup");
const DIRECTIVE     = "_each";
const KEY_DIRECTIVE = "_key";
const destroyBinder = binder => binder._destroy();
const defaultRowKey = data => data;
const isEmptyList   = list => {
    return (Array.isArray(list) && !list.length) || (isPureObject(list) && !Object.keys(list).length);
};

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

    render(handler, node, data) {
        super.render(handler, node, data);
        /** @type NodeHandlerState */
        const state = PRIVATE.get(handler);

        if (!state.update) {
            state.binders = [];
            state.bindersByKey = new Map();
            state.listIterator = () => this.iterateOverList(handler, state.value);
            state.isFirstRender = true; // FIXME: no longer needed?
            state.usesKey = false; // FIXME: no longer needed?
            state.getKey = defaultRowKey;   // FIXME: No longer needed... Delete it.
            // Update is called only if data changes.
            // If the array or object is mutated - state.listIterator is called instead
            state.update = newList => {
                if (newList === state.value) {
                    return;
                }
                else if (state.value) {
                    state.value = null;

                    if (state.listIterator.stopWatchingAll) {
                        state.listIterator.stopWatchingAll();
                    }
                }

                if (!newList) {
                    this.destroyChildBinders(state.binders, handler);
                    return;
                }

                unsetDependencyTracker(state.tracker); // We don't need to be notified of changes for individual items.
                state.value = newList;

                // Make sure data is observable and setup event listners on it.
                makeObservable(newList);

                if (Array.isArray(newList)) {
                    arrayWatch(newList, state.listIterator);
                }
                else if (isPureObject(newList)) {
                    objectWatchProp(newList, null, state.listIterator);
                }

                if (isEmptyList(newList) && state.binders) {
                    this.destroyChildBinders(state.binders, handler);
                }
                else {
                    this.iterateOverList(handler, newList);
                }
            };

            // When handler is destroyed, remove data listeners
            handler.onDestroy(() => {
                if (state.listIterator.stopWatchingAll) {
                    state.listIterator.stopWatchingAll();
                }
                state.bindersByKey.clear();
                this.destroyChildBinders(state.binders, handler);
            });
        }
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

        if (handler._isSoleChild) {
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

    // __ORIG___iterateOverList(handler, newData) {
    //     const state             = PRIVATE.get(handler);
    //     const attachedEleBinder = [];
    //     const newDomElements    = createDocFragment();
    //     let isArray             = Array.isArray(newData);
    //     let data;
    //
    //     if (isArray) {
    //         isArray = true;
    //         data = newData;
    //     }
    //     else if (isPureObject(newData)) {
    //         data = Object.keys(newData);
    //     } else {
    //         return;
    //     }
    //
    //     for (let i = 0, t = data.length; i < t; i++) {
    //         let rowData = { $data: state.data.$data || state.data };
    //
    //         if (isArray) {
    //             this.getDataForIteration([ data[i], i ], rowData);
    //         }
    //         else {
    //             this.getDataForIteration([ newData[ data[i] ], data[i], i ], rowData);
    //         }
    //
    //         const binder = this.getRowBinder(handler, rowData);
    //         binder._loop.pos = i;
    //         attachedEleBinder.push(binder);
    //         newDomElements.appendChild(binder);
    //     }
    //
    //     if (newDomElements.hasChildNodes()) {
    //         insertBefore(handler._placeholderEle.parentNode, newDomElements, handler._placeholderEle);
    //     }
    //
    //     // store the new attached set of elements in their new positions, and
    //     // clean up old Binders that are no longer being used/displayed
    //     // FIXME: this needs to be more efficient!!!!!!
    //     arrayForEach(state.binders.splice(0, state.binders.length, ...attachedEleBinder), childBinder => {
    //         if (attachedEleBinder.indexOf(childBinder) === -1) {
    //             childBinder._destroy();
    //         }
    //     });
    //
    //     if (state.binders.length) {
    //         this.positionChildren(
    //             handler._placeholderEle.parentNode,
    //             handler._placeholderEle,
    //             state.binders
    //         );
    //     }
    // }



    /**
     * Iterates over a new set (list) and eitehr updates or builds out new elements for each item
     * in that list.
     *
     * @param handler
     * @param newData
     */
    iterateOverList(handler, newData) {
        /** @type NodeHandlerState */
        const state             = PRIVATE.get(handler);
        // const attachedEleBinder = [];
        // const newDomElements    = createDocFragment();
        let isArray             = Array.isArray(newData);
        let iterationDataList;


        if (isArray) {
            isArray = true;
            iterationDataList = newData;
        }
        else if (isPureObject(newData)) {
            iterationDataList = Object.keys(newData);
        } else {
            return;
        }


        const currentBinders        = state.binders;
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
            if (isArray) {
                this.getDataForIteration([ iterationDataList[i], i ], rowData);
            }
            else {
                this.getDataForIteration([ newData[ iterationDataList[i] ], iterationDataList[i], i ], rowData);
            }

            const rowKey = getKey(
                usesKey
                    ? rowData                               // => Use rowData created above - getKey() will run a value getter on it.
                    : isArray
                        ? iterationDataList[i]              // => Use the object from the newData
                        : newData[ iterationDataList[i] ]   // => Use the Object key
            );

            // If a binder currently exists, then see if it is the one previously
            // created for this row's data
            if (currentBinders[i] && currentBinders[i]._loop.rowKey === rowKey) {
                // delete rowData.$data; // FIXME: do we really need this?
                currentBinders[i][DOM_DATA_BIND_PROP].setData(rowData);
                continue;
            }

            // If there is a binder at the curerent position, then its not the one need.
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
            let binder = state.bindersByKey.get(rowKey);

            if (!binder) {
                binder = binderToBeDestroyed.get(rowKey);
                if (binder) {
                    binderToBeDestroyed.delete(rowKey);
                }
            }

            if (binder) {
                if (binder._loop.pos !== i) {
                    currentBinders[binder._loop.pos] = null;
                }
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
            } else {
                binder = render(handler._viewTemplate, rowData, handler._directives);
                binder._destroy = destroyRowElement;
                binder._state = state; // FIXME: remove the need for this prop to be set
            }
            binder._loop  = {
                rowKey,
                pos: i
            };
            currentBinders[i] = binder;
            state.bindersByKey.set(rowKey, binder);
            positionRowInDom(currentBinders, i, handler._placeholderEle);


            // const binder = this.getRowBinder(handler, rowData);
            //
            // binder._loop.pos = i;
            // attachedEleBinder.push(binder);
            // newDomElements.appendChild(binder);
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

    /**
     * Handles processing a single data item by either updating and existing binder or creating
     * a new binder.
     *
     * @param {NodeHandler} handler
     * @param {Object} rowData
     *
     * @returns {Template}
     *  returns an array wtih two values:
     *  -   the binder for the data item (could be an exising one)
     *  -   Document fragment containing any new Elements that should be inserted into dom
     */
    // getRowBinder(handler, rowData) {
    //     const state     = PRIVATE.get(handler);
    //     let itemBinder  = null;
    //     let rowKey      = state.getKey(rowData);
    //     let rowEleBinder;
    //
    //     if (rowKey) {
    //         rowEleBinder = state.bindersByKey.get(rowKey);
    //     }
    //
    //     // If a binder already exists for this key, then just update its data
    //     if (rowEleBinder) {
    //         delete rowData.$data;
    //         rowEleBinder[DOM_DATA_BIND_PROP].setData(rowData);
    //         itemBinder = rowEleBinder;
    //         return itemBinder;
    //     }
    //
    //     // Render a new Element from the template and store the nodes that are
    //     // created by it (needed for later).
    //     rowEleBinder = render(handler._n.data, rowData, handler._directives);
    //
    //     // Is it first render? if so, then we need to determine if the DOM element
    //     // that was rendered has the _key attribute
    //     if (state.isFirstRender) {
    //         state.isFirstRender = false;
    //
    //         if (
    //             rowEleBinder.childNodes.length === 1 &&
    //             rowEleBinder.firstChild.nodeType === 1 &&
    //             hasAttribute(rowEleBinder.firstChild, KEY_DIRECTIVE)
    //         ) {
    //             state.usesKey = true;
    //             state.getKey = createValueGetter(getAttribute(rowEleBinder.firstChild, KEY_DIRECTIVE), "each.key");
    //             rowKey = state.getKey(rowData);
    //         }
    //     }
    //
    //     if (state.usesKey) {
    //         removeAttribute(rowEleBinder.firstChild, KEY_DIRECTIVE);
    //     }
    //
    //     rowEleBinder._children = arraySlice(rowEleBinder.childNodes, 0);
    //     rowEleBinder._destroy = destroyRowElement;
    //     rowEleBinder._state = state;
    //     rowEleBinder._loop  = { rowEle: rowEleBinder, rowKey, pos: -1 };
    //
    //     if (rowKey) {
    //         state.bindersByKey.set(rowKey, rowEleBinder);
    //     }
    //
    //     itemBinder = rowEleBinder;
    //     return itemBinder;
    // }

    /**
     *
     * @param {HTMLElement} eleParentNode
     * @param {HTMLElement} placeholderEle
     * @param {Array} childEleBinders
     */
    // positionChildren(eleParentNode, placeholderEle, childEleBinders) {
    //     // FIXME: speed improvement = convert to while() looop
    //     arrayForEach(childEleBinders, (childBinder, index) => {
    //         if (childBinder._loop.pos === index) {
    //             return;
    //         }
    //
    //         insertBefore(
    //             eleParentNode,
    //             childBinder._loop.rowEle,
    //             childEleBinders[index + 1] ? childEleBinders[index + 1]._loop.rowEle : placeholderEle
    //         );
    //         childBinder._loop.pos = index;
    //     });
    // }

    getNodeHandler(node, directives) {
        const handler           = super.getNodeHandler(node);
        handler._directives     = directives;
        handler._placeholderEle = createComment("directive:each");
        handler._isSoleChild    = hasDedicatedParent(node);
        // create the template for the row content, which is stored in the Comment node data
        handler._viewTemplate   = view(node.data, directives);

        if (!handler._viewTemplate[EACH]) {
            setupViewTemplate(handler._viewTemplate);
        }

        insertBefore(node.parentNode, handler._placeholderEle, node);
        removeChild(node.parentNode, node);
        return handler;
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
    // this === DocumentFragment from `render()`

    // remove all elements/nodes of this row from DOM
    this[DOM_DATA_BIND_PROP].recover();

    if (this._loop.rowKey) {
        this._state.bindersByKey.delete(this._loop.rowKey);
    }

    this._state = null;
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
