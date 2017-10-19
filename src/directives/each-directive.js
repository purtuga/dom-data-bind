import nextTick     from "common-micro-libs/src/jsutils/nextTick"
import objectExtend from "common-micro-libs/src/jsutils/objectExtend"
import arrayFindBy  from "common-micro-libs/src/jsutils/arrayFindBy"
import {
    setDependencyTracker,
    unsetDependencyTracker,
    stopDependeeNotifications,
    watchProp,
    observableAssign }                 from "observable-data/src/ObservableObject"
import Directive                from "./Directive"
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
        let dataForTokenValueGetter     = { };
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
        const iterateOverList   = () => {
            const attachedElements = [];

            if (isPureObject(listObj)) {
                Object.keys(listObj).forEach((objKey, index) => {
                    const rowData       = getDataForIteration([listObj[objKey], objKey, index ]);
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
                    rowEleBinder = binder.getFactory().create(rowEle, rowData);
                    rowEleBinder._loop = { rowEle, rowData, rowKey };
                    childEleBinders.push(rowEleBinder);
                    attachedElements.push(rowEleBinder);
                    rowEleBinder.onDestroy(() => removeChild(eleParentNode, rowEle));
                });
            }

            // Clean up old Binders that are no longer being used/displayed
            childEleBinders.splice(0, childEleBinders.length, ...attachedElements).forEach(childBinder => childBinder.destroy());

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
                    // FIXME: stop listening for changes on the prior object
                    // listObjev.off();
                }

                if (!newList) {
                    return;
                }

                listObj     = newList;
                listObjEv   = inst.listObjEv = watchProp(listObj, null, iterateOverList);
                iterateOverList();

                // listObjEv = inst.listObjEv =


            });
        };
        const inst = { updater };

        PRIVATE.set(this, inst);
        removeAttribute(ele, directiveAttr);

        insertBefore(eleParentNode, placeholderEle, ele);
        removeChild(eleParentNode, ele);

        // iteratorArgs.forEach(argName => dataForTokenValueGetter[argName]);

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