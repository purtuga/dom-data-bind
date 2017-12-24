import nextTick     from "common-micro-libs/src/jsutils/nextTick"
import {
    watchProp,
    observableAssign,
    setDependencyTracker,
    unsetDependencyTracker,
    stopDependeeNotifications } from "observable-data/src/ObservableObject"
import Directive                from "./Directive"
import {
    PRIVATE,
    removeAttribute,
    createValueGetter,
    hasAttribute,
    deferExec  } from "../utils"

//============================================
const DIRECTIVE             = "_class";

const ClassDirective = Directive.extend({
    init(ele, directiveAttr, attrValue) {
        let cssClassList        = {};
        let updateAlreadyQueued = false;
        let domEleUpdateQueued  = false;
        let dataForGetter       = null;
        const eleClassList      = ele.classList;
        const addClass          = eleClassList.add.bind(eleClassList);
        const removeClass       = eleClassList.remove.bind(eleClassList);
        const containsClass     = eleClassList.contains.bind(eleClassList);
        let tokenValueGetter    = createValueGetter((attrValue || ""));
        const updater = data => {
            if (this.isDestroyed) {
                return;
            }
            if (data) {
                if (dataForGetter) {
                    stopDependeeNotifications(updater);
                }
                dataForGetter = data;
            }
            if (updateAlreadyQueued) {
                return;
            }
            updateAlreadyQueued = true;
            nextTick(() => {
                if (this.isDestroyed) {
                    return;
                }
                setDependencyTracker(updater);
                try {
                    observableAssign(cssClassList, tokenValueGetter(dataForGetter || {}));
                }
                catch(e) {
                    console.error(e);
                }
                unsetDependencyTracker(updater);
                updateAlreadyQueued = false;
            });
        };
        const applyClassesToDomEle = () => {
            if (domEleUpdateQueued) {
                return;
            }
            domEleUpdateQueued = true;
            nextTick(() => {
                Object.keys(cssClassList).forEach(className => {
                    if (cssClassList[className] && !containsClass(className)) {
                        addClass(className);
                    }
                    else if (containsClass(className)) {
                        removeClass(className);
                    }
                });
                domEleUpdateQueued = false;
            });
        };
        const inst = { updater };

        inst.classObjEv = watchProp(cssClassList, cssClassList, applyClassesToDomEle);
        removeAttribute(ele, directiveAttr);
        PRIVATE.set(this, inst);

        this.onDestroy(() => {
            cssClassList = dataForGetter = tokenValueGetter = null;
            deferExec(() => {
                stopDependeeNotifications(updater);
                this.getFactory().getDestroyCallback(inst, PRIVATE)();
            });
        });
    }
});

export default ClassDirective;

ClassDirective.has = function (ele) {
    return hasAttribute(ele, DIRECTIVE) ? DIRECTIVE : "";
};
