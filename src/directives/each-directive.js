import nextTick     from "common-micro-libs/src/jsutils/nextTick"
import objectExtend from "common-micro-libs/src/jsutils/objectExtend"
import {
    setDependencyTracker,
    unsetDependencyTracker,
    stopDependeeNotifications,
    watchProp }                 from "observable-data/src/ObservableObject"
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
const DIRECTIVE = "b-each";

/**
 * Directive to loop through an array or object
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
        const placeholderEle            = createComment("");
        const iterateOverList           = () => {
            if (isPureObject(listObj)) {
                Object.keys(listObj).forEach((objKey, index) => {
                    const thisEle = ele.cloneNode(true);
                    const thisData = { $data: dataForTokenValueGetter };
                    const iteratorArgValues = [ listObj[objKey], objKey, index ];

                    iteratorArgs.forEach(argName => thisData[argName] = iteratorArgValues.shift());
                    insertBefore(eleParentNode, thisEle, placeholderEle);
                    binder.getFactory().create(thisEle, thisData);
                });
            }
        };
        const updater                   = data => {
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