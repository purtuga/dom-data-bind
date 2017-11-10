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
    createValueGetter,
    deferExec } from "../utils"

//============================================
const DIRECTIVE = "_if";

const IfDirective = Directive.extend({
    init(ele, directiveAttr, binder) {
        let dataForTokenValueGetter = null;
        let updateAlreadyQueued     = false;
        let showElement             = true;
        let clonedEleBinder;
        const eleParentNode         = ele.parentNode;
        let tokenValueGetter        = createValueGetter(getAttribute(ele, directiveAttr));
        const placeholderEle        = createComment("");
        const updater               = data => {
            if (this.isDestroyed) {
                return;
            }
            if (data) {
                if (dataForTokenValueGetter) {
                    stopDependeeNotifications(updater);
                }
                dataForTokenValueGetter = data;
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
                    showElement = tokenValueGetter(dataForTokenValueGetter || {});
                }
                catch(e) {
                    console.error(e);
                }
                unsetDependencyTracker(updater);
                updateAlreadyQueued = false;

                if (showElement && !clonedEleBinder) {
                    const clonedEle = ele.cloneNode(true);
                    insertBefore(eleParentNode, clonedEle, placeholderEle);
                    clonedEleBinder = binder.getFactory().create(clonedEle, dataForTokenValueGetter);
                    clonedEleBinder.onDestroy(() => {
                        // We do this check because a directive could have
                        // removed the element from its parent.
                        if (clonedEle.parentNode) {
                            removeChild(eleParentNode, clonedEle);
                        }
                    });
                }
                else if (!showElement && clonedEleBinder)  {
                    clonedEleBinder.destroy();
                    clonedEleBinder = inst.ifBinder = null;
                }
            });
        };
        const inst = { updater };

        PRIVATE.set(this, inst);
        removeAttribute(ele, directiveAttr);

        insertBefore(eleParentNode, placeholderEle, ele);
        removeChild(eleParentNode, ele);

        this.onDestroy(() => {
            dataForTokenValueGetter = tokenValueGetter = null;
            removeChild(eleParentNode, placeholderEle);
            deferExec(() => {
                stopDependeeNotifications(updater);
                this.getFactory().getDestroyCallback(inst, PRIVATE)();
            });
        });
    }
});

export default IfDirective;

IfDirective.has = function (ele) {
    return hasAttribute(ele, DIRECTIVE) ? DIRECTIVE : "";
};