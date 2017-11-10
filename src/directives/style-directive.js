import nextTick from "common-micro-libs/src/jsutils/nextTick"
import {
    watchProp,
    observableAssign,
    setDependencyTracker,
    unsetDependencyTracker,
    stopDependeeNotifications } from "observable-data/src/ObservableObject"
import {
    PRIVATE,
    getAttribute,
    removeAttribute,
    createValueGetter,
    hasAttribute,
    deferExec } from "../utils"
import Directive        from "./Directive"

//============================================
const DIRECTIVE             = "_style";

const StyleDirective = Directive.extend({
    init(ele, directiveAttr) {
        let cssStyleList        = {};
        let updateAlreadyQueued = false;
        let domEleUpdateQueued  = false;
        let dataForGetter       = null;
        const eleStyleList      = ele.style;
        let tokenValueGetter    = createValueGetter(getAttribute(ele, directiveAttr));
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
                    observableAssign(cssStyleList, tokenValueGetter(dataForGetter || {}));
                }
                catch(e) {
                    console.error(e);
                }
                unsetDependencyTracker(updater);
                updateAlreadyQueued = false;
            });
        };
        const applyStylesToDomEle = () => {
            if (domEleUpdateQueued) {
                return;
            }
            domEleUpdateQueued = true;
            nextTick(() => {
                Object.keys(cssStyleList).forEach(styleProp => {
                    if (eleStyleList[styleProp] !== cssStyleList[styleProp]) {
                        eleStyleList[styleProp] = cssStyleList[styleProp];
                    }
                });
                domEleUpdateQueued = false;
            });
        };
        const inst = { updater };

        inst.classObjEv = watchProp(cssStyleList, cssStyleList, applyStylesToDomEle);
        removeAttribute(ele, directiveAttr);
        PRIVATE.set(this, inst);

        this.onDestroy(() => {
            deferExec(() => {
                stopDependeeNotifications(updater);
                this.getFactory().getDestroyCallback(inst, PRIVATE)();
            });
            cssStyleList = dataForGetter = tokenValueGetter = null;
        });
    }
});

export default StyleDirective;

StyleDirective.has = function (ele) {
    return hasAttribute(ele, DIRECTIVE) ? DIRECTIVE : "";
};
