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
        this._listVar           = listVar;
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
                    // destroyChildBinders();
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
                    // destroyChildBinders();
                }
                else {
                    this.iterateOverList(handler, newList);
                }
            };
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
     *      // Array Keys           // Array values             // result object
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

    iterateOverList(handler, newData) {
        const state = PRIVATE.get(handler);
        const attachedEleBinder = [];
        const newDomElements    = createDocFragment();
        let isArray             = Array.isArray(newData);
        let data;

        // FIXME: make this function part of the class
        const dataItemIterator  = (item, index) => {
            let rowData = { $data: state.data.$data || state.data };

            if (isArray) {
                this.getDataForIteration([ item, index ], rowData);
            }
            else {
                this.getDataForIteration([ newData[item], item, index ], rowData);
            }

            const rowKey = handler.getKey(rowData);
            let rowEleBinder;

            if (rowKey) {
                rowEleBinder = state.bindersByKey.get(rowKey);
            }

            // If a binder already exists for this key, then just update its data
            if (rowEleBinder) {
                delete rowData.$data;
                observableAssign(rowEleBinder._loop.rowData, rowData);
                attachedEleBinder.push(rowEleBinder);
                return;
            }

            const frag = createDocFragment();
            const rowEle = handler._n.cloneNode(true);
            frag.appendChild(rowEle);


            rowEleBinder        = new handler._Factory(rowEle, rowData);
            rowEleBinder._loop  = { rowEle, rowData, rowKey, pos: attachedEleBinder.length };
            newDomElements.appendChild(frag);

            if (rowKey) {
                state.bindersByKey.set(rowKey, rowEleBinder);
            }

            state.binders.push(rowEleBinder);
            attachedEleBinder.push(rowEleBinder);

            rowEleBinder.onDestroy(() => {
                rowEle.parentNode && removeChild(handler._placeholderEle.parentNode, rowEle);
                if (rowKey) {
                    state.bindersByKey.delete(rowKey);
                }
            });
        };

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
            dataItemIterator(data[i], i);
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

        this.positionChildren(
            handler._placeholderEle.parentNode,
            handler._placeholderEle,
            state.binders
        );
    }

    dataItemIterator(handler, item, index, isArray) {
        const state = PRIVATE.get(handler);
        const rowData = { $data: state.data.$data || state.data };

        if (isArray) {
            this.getDataForIteration([ item, index ], rowData);
        }
        else {
            this.getDataForIteration([ state.data[item], item, index ], rowData);
        }

        const rowKey = handler.getKey(rowData);
        let rowEleBinder;

        if (rowKey) {
            rowEleBinder = state.bindersByKey.get(rowKey);
        }

        // If a binder already exists for this key, then just update its data
        if (rowEleBinder) {
            delete rowData.$data;
            observableAssign(rowEleBinder._loop.rowData, rowData);
            attachedEleBinder.push(rowEleBinder);
            return;
        }

        const frag = createDocFragment();
        const rowEle = handler._n.cloneNode(true);
        frag.appendChild(rowEle);


        rowEleBinder        = new handler._Factory(rowEle, rowData);
        rowEleBinder._loop  = { rowEle, rowData, rowKey, pos: attachedEleBinder.length };
        newDomElements.appendChild(frag);

        if (rowKey) {
            state.bindersByKey.set(rowKey, rowEleBinder);
        }

        state.binders.push(rowEleBinder);
        attachedEleBinder.push(rowEleBinder);

        rowEleBinder.onDestroy(() => {
            rowEle.parentNode && removeChild(handler._placeholderEle.parentNode, rowEle);
            if (rowKey) {
                state.bindersByKey.delete(rowKey);
            }
        });
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

        insertBefore(node.parentNode, handler._placeholderEle, node);
        removeAttribute(node, KEY_DIRECTIVE);
        removeChild(node.parentNode, node);

        return handler;
    }



    ____init(ele, directiveAttr, attrValue, binder) {
        let dataForTokenValueGetter     = {};
        let updateAlreadyQueued         = false;
        const BinderFactory             = binder.getFactory();
        const eleParentNode             = ele.parentNode;
        const [ iteratorArgs, listVar ] = parseDirectiveValue((attrValue || "").trim());
        let tokenValueGetter            = createValueGetter(listVar);
        let isDedicatedParent;
        let listObj;
        let listObjEv;
        let childEleBinders         = [];
        const keyToBinderMap        = new Map();
        const placeholderEle        = createComment("");
        const getDataForIteration   = iteratorArgValues => {
            return iteratorArgs.reduce((rowData, argName) => {
                rowData[argName] = iteratorArgValues.shift();
                return rowData;
            }, { $data: dataForTokenValueGetter.$data || dataForTokenValueGetter });
        };
        const getIterationKey   = hasAttribute(ele, KEY_DIRECTIVE) ?
            createValueGetter(getAttribute(ele, KEY_DIRECTIVE)) :
            () => {};
        const positionChildren  = () => {
            arrayForEach(childEleBinders, (childBinder, index) => {
                const childInstance = childBinder._loop;
                if (childInstance.pos === index) {
                    return;
                }

                insertBefore(
                    eleParentNode,
                    childInstance.rowEle,
                    childEleBinders[index + 1] ? childEleBinders[index + 1]._loop.rowEle : placeholderEle
                );
                childInstance.pos = index;
            });
        };
        const iterateOverList   = () => {
            const attachedEleBinder = [];
            const newDomElements    = createDocFragment();
            let isArray             = false;
            let data;

            const dataItemIterator  = (item, index) => {
                let rowData;

                if (isArray) {
                    rowData = getDataForIteration([ item, index ]);
                }
                else {
                    rowData = getDataForIteration([ data[item], item, index ]);
                }

                const rowKey = getIterationKey(rowData);
                let rowEleBinder;

                if (rowKey) {
                    rowEleBinder = keyToBinderMap.get(rowKey);
                }

                // If a binder already exists for this key, then just update its data
                if (rowEleBinder) {
                    delete rowData.$data;
                    observableAssign(rowEleBinder._loop.rowData, rowData);
                    attachedEleBinder.push(rowEleBinder);
                    return;
                }

                const frag = createDocFragment();
                const rowEle = ele.cloneNode(true);
                frag.appendChild(rowEle);


                rowEleBinder        = BinderFactory.create(rowEle, rowData);
                rowEleBinder._loop  = { rowEle, rowData, rowKey, pos: attachedEleBinder.length };
                newDomElements.appendChild(frag);

                if (rowKey) {
                    keyToBinderMap.set(rowKey, rowEleBinder);
                }

                childEleBinders.push(rowEleBinder);
                attachedEleBinder.push(rowEleBinder);

                rowEleBinder.onDestroy(() => {
                    rowEle.parentNode && removeChild(eleParentNode, rowEle);
                    if (rowKey) {
                        keyToBinderMap.delete(rowKey);
                    }
                });
            };

            if (Array.isArray(listObj)) {
                isArray = true;
                data = listObj;
            }
            else if (isPureObject(listObj)) {
                data = Object.keys(listObj);
            } else {
                return;
            }

            for (let i = 0, t = data.length; i < t; i++) {
                dataItemIterator(data[i], i);
            }

            if (newDomElements.hasChildNodes()) {
                insertBefore(eleParentNode, newDomElements, placeholderEle);
            }

            // store the new attached set of elements in their new positions, and
            // clean up old Binders that are no longer being used/displayed
            arrayForEach(childEleBinders.splice(0, childEleBinders.length, ...attachedEleBinder), childBinder => {
                if (childEleBinders.indexOf(childBinder) === -1) {
                    childBinder.destroy();
                }
            });

            positionChildren();
        };
        const destroyChildBinders = () => {
            const callDestroyOnBinders = () => arrayForEach(childEleBinders.splice(0), binder => binder.destroy());

            if (isDedicatedParent) {
                eleParentNode.textContent = "";
                eleParentNode.appendChild(placeholderEle);
                setTimeout(callDestroyOnBinders);
            }
            else {
                callDestroyOnBinders();
            }

        };
        const isEmptyList = list => {
            return (Array.isArray(list) && !list.length) || (isPureObject(list) && !Object.keys(list).length);
        };
        const applyUpdateToDom = () => {
            if (this.isDestroyed) {
                return;
            }
            setDependencyTracker(updater);
            let newList;
            try {
                newList = tokenValueGetter(dataForTokenValueGetter);
            }
            catch(e) {
                console.error(e);
            }
            unsetDependencyTracker(updater);
            updateAlreadyQueued = false;

            if (newList === listObj) {
                return;
            }
            else if (listObj) {
                listObj = null;

                if (listObjEv) {
                    listObjEv.off();
                    listObjEv = null;
                }
            }

            if (!newList) {
                destroyChildBinders();
                return;
            }

            listObj = newList;

            // FIXME: Move all this logi to be inside of hte try{} block. Then, all dependency tracking is taken care of
            if (Array.isArray(listObj)) {
                makeArrayObservable(listObj);
                listObjEv = listObj.on("change", iterateOverList);
            }
            else if (isPureObject(listObj)) {
                listObjEv = inst.listObjEv = watchProp(listObj, listObj, iterateOverList);
            }

            if (isEmptyList(newList)) {
                destroyChildBinders();
            }
            else {
                iterateOverList();
            }
        };
        const updater = data => {
            if (this.isDestroyed) {
                return;
            }
            if (data) {
                stopDependeeNotifications(updater);
                dataForTokenValueGetter = data;
            }
            if (updateAlreadyQueued) {
                return;
            }
            updateAlreadyQueued = true;
            nextTick(applyUpdateToDom);
        };
        const inst = { updater };

        PRIVATE.set(this, inst);
        removeAttribute(ele, KEY_DIRECTIVE);
        removeAttribute(ele, directiveAttr);
        insertBefore(eleParentNode, placeholderEle, ele);
        removeChild(eleParentNode, ele);
        isDedicatedParent = Array.prototype.every.call(eleParentNode.childNodes, node => {
            return node === placeholderEle || (node.nodeType === 3 && !node.textContent.trim());
        });

        this.onDestroy(() => {
            dataForTokenValueGetter = tokenValueGetter = null;
            removeChild(eleParentNode, placeholderEle);
            destroyChildBinders();
            deferExec(() => {
                stopDependeeNotifications(updater);
                this.getFactory().getDestroyCallback(inst, PRIVATE)();
                keyToBinderMap.clear();
            });
        });
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


export default EachDirective;


EachDirective.__new = true; // FIXME: remove this