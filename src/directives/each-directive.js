import nextTick     from "common-micro-libs/src/jsutils/nextTick"
import Map          from "common-micro-libs/src/jsutils/es6-Map"
import {
    setDependencyTracker,
    unsetDependencyTracker,
    stopDependeeNotifications,
    watchProp,
    observableAssign }                  from "observable-data/src/ObservableObject"
import { mixin as makeArrayObservable } from "observable-data/src/ObservableArray"
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
    arrayForEach,
    deferExec } from "../utils"

//============================================
const DIRECTIVE     = "_each";
const KEY_DIRECTIVE = "_key";

/**
 * Directive to loop through an array or object. In addition, it also support an
 * internal binding directive called `b:key`
 *
 * @class EachDirective
 * @extends Directive
 *
 * @example
 *
 * b:each="item of arrayList"
 * b:each="(item, index) of arrayList"
 * b:each="value of objectList"
 * b:each="(value, key) of objectList"
 */
const EachDirective = Directive.extend({
    init(ele, directiveAttr, binder) {
        let dataForTokenValueGetter     = {};
        let updateAlreadyQueued         = false;
        const BinderFactory             = binder.getFactory();
        const eleParentNode             = ele.parentNode;
        const [ iteratorArgs, listVar ] = parseDirectiveValue(getAttribute(ele, directiveAttr).trim());
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
            childEleBinders.forEach((childBinder, index) => {
                const childInstance = childBinder._loop;
                if (childInstance.pos === index) {
                    return;
                }

                let nextSibling = childEleBinders[index + 1] ? childEleBinders[index + 1]._loop.rowEle : placeholderEle;
                insertBefore(eleParentNode, childInstance.rowEle, nextSibling);
                childInstance.pos = index;
            });
        };
        const iterateOverList   = () => {
            const attachedEleBinder = [];
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

                const rowEle = ele.cloneNode(true);

                insertBefore(eleParentNode, rowEle, placeholderEle);


                rowEleBinder        = BinderFactory.create(rowEle, rowData);
                rowEleBinder._loop  = { rowEle, rowData, rowKey, pos: attachedEleBinder.length };

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

            arrayForEach(data, dataItemIterator);

            // store the new attached set of elements in their new positions, and
            // clean up old Binders that are no longer being used/displayed
            childEleBinders
                .splice(0, childEleBinders.length, ...attachedEleBinder)
                .forEach(childBinder => {
                    if (childEleBinders.indexOf(childBinder) === -1) {
                        childBinder.destroy();
                    }
                });

            positionChildren();
        };
        const destroyChildBinders = () => {
            const callDestroyOnBinders = () => childEleBinders.splice(0).forEach(binder => binder.destroy());

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
});

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

EachDirective.has = function (ele) {
    return hasAttribute(ele, DIRECTIVE) ? DIRECTIVE : "";
};