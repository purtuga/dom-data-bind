import nextTick from "common-micro-libs/src/jsutils/nextTick"
import {
    setDependencyTracker,
    unsetDependencyTracker,
    stopDependeeNotifications } from "observable-data/src/ObservableObject"
import Directive                from "./Directive"
import {
    PRIVATE,
    hasAttribute,
    getAttribute,
    removeAttribute,
    createComment,
    insertBefore,
    removeChild,
    createValueGetter } from "../utils"

//============================================
const DIRECTIVE = "b-if";

const IfDirective = Directive.extend({
    init(ele, directiveAttr, binder) {
        let dataForTokenValueGetter = {};
        let updateAlreadyQueued     = false;
        let showElement             = true;
        const eleParentNode         = ele.parentNode;
        const isVisible             = () => !!ele.parentNode;
        let tokenValueGetter        = createValueGetter(getAttribute(ele, directiveAttr));
        const placeholderEle        = createComment("");
        const updater               = data => {
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
                try {
                    showElement = tokenValueGetter(dataForTokenValueGetter);
                }
                catch(e) {
                    console.error(e);
                }
                unsetDependencyTracker(updater);
                updateAlreadyQueued = false;

                if (showElement && !isVisible()) {
                    insertBefore(eleParentNode, ele, placeholderEle);
                }
                else if (isVisible())  {
                    removeChild(eleParentNode, ele);
                }
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
        });
    }
});

export default IfDirective;

IfDirective.has = function (ele) {
    return hasAttribute(ele, DIRECTIVE) ? DIRECTIVE : "";
};