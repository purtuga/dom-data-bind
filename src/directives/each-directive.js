import nextTick     from "common-micro-libs/src/jsutils/nextTick"
import Map          from "common-micro-libs/src/jsutils/es6-Map"
import {
    setDependencyTracker,
    unsetDependencyTracker,
    stopDependeeNotifications,
    watchProp,
    observableAssign }                  from "observable-data/src/ObservableObject"
import { mixin as makeArrayObservable } from "observable-data/src/ObservableArray"
import { observeAll }                   from "observable-data"
import Directive                        from "./Directive"
import {
    PRIVATE,
    hasAttribute,
    getAttribute,
    removeAttribute,
    createComment,
    insertBefore,
    removeChild,
    createValueGetter,
    isPureObject,
    createDocFragment,
    arrayForEach,
    deferExec } from "../utils"

//============================================
const DIRECTIVE     = "_each";
const KEY_DIRECTIVE = "_key";
const NOOP          = () => {};
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
        this._tokenValueGetter  = createValueGetter((listVar || ""));
    }

    render(handler, node, data) {
        super.render(handler, node, data);
        const state = PRIVATE.get(handler);

        if (!state.update) {
            state.binders = [];     // FIXME: why we need both? array and map() below
            state.bindersByKey = new Map();
            state.listChgEv = null;
            state.listIterator = () => this.iterateOverList(handler, state.value);
            state.update = newList => {
                if (newList === state.value) {
                    return;
                }
                else if (state.value) {
                    state.value = null;

                    if (state.listChgEv) {
                        state.listChgEv.off();
                        state.listChgEv = null;
                    }
                }

                if (!newList) {
                    this.destroyChildBinders(state.binders, handler);
                    return;
                }

                state.value = newList;

                // Make sure data is observable and setup event listners on it.
                observeAll(newList);

                // FIXME: Move all this logi to be inside of hte try{} block. Then, all dependency tracking is taken care of
                if (Array.isArray(newList)) {
                    state.listChgEv = newList.on("change", state.listIterator);
                }
                else if (isPureObject(newList)) {
                    state.listChgEv = watchProp(newList, newList, state.listIterator);
                }

                if (isEmptyList(newList)) {
                    this.destroyChildBinders(state.binders, handler);
                }
                else {
                    this.iterateOverList(handler, newList);
                }
            };

            // When handler is destroyed, remove data listeners
            handler.onDestroy(() => {
                if (state.listChgEv) {
                    state.listChgEv.off();
                    state.listChgEv = null;
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
        binders = binders.splice(0);

        if (handler._isSoleChild) {
            handler._placeholderEle.parentNode.textContent = "";
            handler._placeholderEle.parentNode.appendChild(handler._placeholderEle);
            setTimeout(() => {
                arrayForEach(binders.splice(0), binder => binder.destroy())
            });
        }
        else {
            arrayForEach(binders.splice(0), binder => binder.destroy());
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
        const state             = PRIVATE.get(handler);
        const attachedEleBinder = [];
        const newDomElements    = createDocFragment();
        let isArray             = Array.isArray(newData);
        let data;

        if (isArray) {
            isArray = true;
            data = newData;
        }
        else if (isPureObject(newData)) {
            data = Object.keys(newData);
        } else {
            return;
        }

        for (let i = 0, t = data.length; i < t; i++) {
            let rowData = { $data: state.data.$data || state.data };

            if (isArray) {
                this.getDataForIteration([ data[i], i ], rowData);
            }
            else {
                this.getDataForIteration([ newData[ data[i] ], data[i], i ], rowData);
            }

            const [ binder, newEle ] = this.getRowBinder(handler, rowData);
            binder._loop.pos = attachedEleBinder.length;
            attachedEleBinder.push(binder);
            newDomElements.appendChild(newEle);
        }

        if (newDomElements.hasChildNodes()) {
            insertBefore(handler._placeholderEle.parentNode, newDomElements, handler._placeholderEle);
        }

        // store the new attached set of elements in their new positions, and
        // clean up old Binders that are no longer being used/displayed
        // FIXME: this needs to be more efficient!!!!!!
        arrayForEach(state.binders.splice(0, state.binders.length, ...attachedEleBinder), childBinder => {
            if (state.binders.indexOf(childBinder) === -1) {
                if (childBinder._loop.rowEle && childBinder._loop.rowEle.parentNode) {
                    childBinder._loop.rowEle.parentNode.removeChild(childBinder._loop.rowEle);
                }
                childBinder.destroy(); // this is aysnc
            }
        });

        if (state.binders.length) {
            this.positionChildren(
                handler._placeholderEle.parentNode,
                handler._placeholderEle,
                state.binders
            );
        }
    }

    /**
     * Handles processing a single data item by either updating and existing binder or creating
     * a new binder.
     *
     * @param {NodeHandler} handler
     * @param {Object} rowData
     *
     * @returns {Array<DomDataBind, HTMLFragment>}
     *  returns an array wtih two values:
     *  -   the binder for the data item (could be an exising one)
     *  -   Document fragment containing any new Elements that should be inserted into dom
     */
    getRowBinder(handler, rowData) {
        const state             = PRIVATE.get(handler);
        let itemBinder          = null;
        const newDomElements    = createDocFragment();

        const rowKey = handler.getKey(rowData);
        let rowEleBinder;

        if (rowKey) {
            rowEleBinder = state.bindersByKey.get(rowKey);
        }

        // If a binder already exists for this key, then just update its data
        if (rowEleBinder) {
            delete rowData.$data;
            observableAssign(rowEleBinder._loop.rowData, rowData);
            itemBinder = rowEleBinder;
            return [ itemBinder, newDomElements ];
        }

        const frag = createDocFragment();
        const rowEle = handler._n.cloneNode(true);
        frag.appendChild(rowEle);

        rowEleBinder        = new handler._Factory(rowEle, rowData);
        rowEleBinder._loop  = { rowEle, rowData, rowKey, pos: -1 };
        newDomElements.appendChild(frag);

        if (rowKey) {
            state.bindersByKey.set(rowKey, rowEleBinder);
        }

        itemBinder = rowEleBinder;

        rowEleBinder.onDestroy(() => {
            rowEle.parentNode && removeChild(handler._placeholderEle.parentNode, rowEle);
            if (rowKey) {
                state.bindersByKey.delete(rowKey);
            }
        });

        return [ itemBinder, newDomElements ];
    }

    /**
     *
     * @param {HTMLElement} eleParentNode
     * @param {HTMLElement} placeholderEle
     * @param {Array} childEleBinders
     */
    positionChildren(eleParentNode, placeholderEle, childEleBinders) {
        // FIXME: speed improvement = convert to while() looop
        arrayForEach(childEleBinders, (childBinder, index) => {
            if (childBinder._loop.pos === index) {
                return;
            }

            insertBefore(
                eleParentNode,
                childBinder._loop.rowEle,
                childEleBinders[index + 1] ? childEleBinders[index + 1]._loop.rowEle : placeholderEle
            );
            childBinder._loop.pos = index;
        });
    }

    getNodeHandler(node, binder) {
        const handler           = super.getNodeHandler(node);
        handler._Factory        = binder.getFactory();
        handler._placeholderEle = createComment("");
        handler.getKey          = hasAttribute(node, KEY_DIRECTIVE) ? createValueGetter(getAttribute(node, KEY_DIRECTIVE)) : NOOP;
        handler._isSoleChild    = hasDedicatedParent(node);

        insertBefore(node.parentNode, handler._placeholderEle, node);
        removeChild(node.parentNode, node);
        removeAttribute(node, KEY_DIRECTIVE);

        return handler;
    }
}

function parseDirectiveValue(attrValue) {
    let matches = /\(?(.+?)\)?\W?(?:of|in)\W(.*)/.exec(attrValue);
    if (matches) {
        matches = matches.slice(1);
        matches[0] = matches[0].split(/\,/).map(argName => String(argName).trim());
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


EachDirective.__new = true; // FIXME: remove this