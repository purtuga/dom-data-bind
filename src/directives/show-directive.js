import nextTick from "common-micro-libs/src/jsutils/nextTick"
import {
    setDependencyTracker,
    unsetDependencyTracker,
    stopDependeeNotifications } from "observable-data/src/ObservableObject"
import Directive                from "./Directive"
import {
    PRIVATE,
    getAttribute,
    removeAttribute,
    createValueGetter,
    hasAttribute,
    deferExec } from "../utils"

//============================================
const DIRECTIVE             = "_show";
const HIDDEN                = "none";

const ShowDirective = Directive.extend({
    init(ele, directiveAttr) {
        let dataForTokenValueGetter = null;
        let updateAlreadyQueued     = false;
        let showElement             = true;
        const eleStyleList          = ele.style;
        const eleDisplayStyle       = eleStyleList.display;
        let tokenValueGetter        = createValueGetter(getAttribute(ele, directiveAttr));
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

                if (showElement) {
                    eleStyleList.display = eleDisplayStyle;
                }
                else if (eleStyleList.display !== HIDDEN)  {
                    eleStyleList.display = HIDDEN;
                }
            });
        };
        const inst = { updater };

        PRIVATE.set(this, inst);
        removeAttribute(ele, directiveAttr);

        this.onDestroy(() => {
            deferExec(() => {
                stopDependeeNotifications(updater);
                this.getFactory().getDestroyCallback(inst, PRIVATE)();
            });
            dataForTokenValueGetter = tokenValueGetter = null;
        });
    }
});

export default ShowDirective;

ShowDirective.has = function (ele) {
    return hasAttribute(ele, DIRECTIVE) ? DIRECTIVE : "";
};
