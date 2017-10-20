import nextTick     from "common-micro-libs/src/jsutils/nextTick"
import arrayFindBy  from "common-micro-libs/src/jsutils/arrayFindBy"
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
    isPureObject } from "../utils"

//============================================
const DIRECTIVE     = "b-each";
const KEY_DIRECTIVE = "b:key";

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
        const eleParentNode             = ele.parentNode;
        const [ iteratorArgs, listVar ] = parseDirectiveValue(getAttribute(ele, directiveAttr).trim());
        let tokenValueGetter            = createValueGetter(listVar);
        let listObj;
        let listObjEv;
        let childEleBinders         = [];
        const placeholderEle        = createComment("");
        const getDataForIteration   = iteratorArgValues => {
            return iteratorArgs.reduce((rowData, argName) => {
                rowData[argName] = iteratorArgValues.shift();
                return rowData;
            }, { $data: dataForTokenValueGetter.$data || dataForTokenValueGetter });
        };
        const getIterationKey   = rowData => {
            if (hasAttribute(ele, KEY_DIRECTIVE)) {
                return createValueGetter(getAttribute(ele, KEY_DIRECTIVE))(rowData);
            }
        };
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
            const attachedElements  = [];
            let isArray             = false;
            let data;

            if (Array.isArray(listObj)) {
                isArray = true;
                data = listObj;
            }
            else if (isPureObject(listObj)) {
                data = Object.keys(listObj);
            } else {
                return;
            }

            data.forEach((item, index) => {
                let rowData;

                if (isArray) {
                    rowData = getDataForIteration([ item, index ]);
                }
                else {
                    rowData = getDataForIteration([ data[item], item, index ]);
                }

                const rowKey        = getIterationKey(rowData);
                let rowEleBinder    = arrayFindBy(childEleBinders, binder => rowKey && binder._loop.rowKey === rowKey);

                // If a binder already exists for this key, then just update its data
                if (rowEleBinder) {
                    delete rowData.$data;
                    observableAssign(rowEleBinder._loop.rowData, rowData);
                    attachedElements.push(rowEleBinder);
                    return;
                }

                const rowEle = ele.cloneNode(true);

                removeAttribute(rowEle, KEY_DIRECTIVE);
                insertBefore(eleParentNode, rowEle, placeholderEle);

                rowEleBinder        = binder.getFactory().create(rowEle, rowData);
                rowEleBinder._loop  = { rowEle, rowData, rowKey, pos: attachedElements.length };
                childEleBinders.push(rowEleBinder);
                attachedElements.push(rowEleBinder);

                rowEleBinder.onDestroy(() => removeChild(eleParentNode, rowEle));
            });

            // store the new attached set of elements in their new positions, and
            // clean up old Binders that are no longer being used/displayed
            childEleBinders
                .splice(0, childEleBinders.length, ...attachedElements)
                .forEach(childBinder => {
                    if (childEleBinders.indexOf(childBinder) === -1) {
                        childBinder.destroy();
                    }
                });

            positionChildren();
        };
        const updater = data => {
            if (data) {
                stopDependeeNotifications(updater);
                dataForTokenValueGetter = data;
            }
            if (updateAlreadyQueued) {
                return;
            }
            updateAlreadyQueued = true;
            nextTick(() => {
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

                iterateOverList();
            });
        };
        const inst = { updater };

        PRIVATE.set(this, inst);
        removeAttribute(ele, directiveAttr);

        insertBefore(eleParentNode, placeholderEle, ele);
        removeChild(eleParentNode, ele);

        this.onDestroy(() => {
            stopDependeeNotifications(updater);
            this.getFactory().getDestroyCallback(inst, PRIVATE)();
            dataForTokenValueGetter = tokenValueGetter = null;
            removeChild(eleParentNode, placeholderEle);
            childEleBinders.splice(0).forEach(binder => binder.destroy());
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