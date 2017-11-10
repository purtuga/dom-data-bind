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
const DIRECTIVE             = "_html";

const HtmlDirective = Directive.extend({
    init(ele, directiveAttr) {
        let dataForTokenValueGetter = null;
        let updateAlreadyQueued     = false;
        let tokenValueGetter        = createValueGetter(getAttribute(ele, directiveAttr));
        let htmlMarkup              = "";
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
                let newHtmlMarkup = "";
                try {
                    newHtmlMarkup = tokenValueGetter(dataForTokenValueGetter || {});
                }
                catch(e) {
                    console.error(e);
                }
                unsetDependencyTracker(updater);
                updateAlreadyQueued = false;

                if (newHtmlMarkup === htmlMarkup) {
                    return;
                }

                ele.innerHTML = htmlMarkup = newHtmlMarkup;
            });
        };
        const inst = { updater };

        PRIVATE.set(this, inst);
        removeAttribute(ele, directiveAttr);
        ele.innerHTML = "";

        this.onDestroy(() => {
            dataForTokenValueGetter = tokenValueGetter = null;
            htmlMarkup = undefined;
            deferExec(() => {
                stopDependeeNotifications(updater);
                this.getFactory().getDestroyCallback(inst, PRIVATE)();
            });
        });
    }
});

export default HtmlDirective;

HtmlDirective.has = function (ele) {
    return hasAttribute(ele, DIRECTIVE) ? DIRECTIVE : "";
};
