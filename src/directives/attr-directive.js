import nextTick from "common-micro-libs/src/jsutils/nextTick"
import {
    setDependencyTracker,
    unsetDependencyTracker,
    stopDependeeNotifications } from "observable-data/src/ObservableObject"
import Directive                from "./Directive"
import {
    PRIVATE,
    escapeString,
    getAttribute,
    removeAttribute,
    setAttribute,
    createValueGetter,
    getNodeAttrNames,
    deferExec } from "../utils"

//============================================
const DIRECTIVE             = "_attr.";
const matchesDirective      = new RegExp(`^${ escapeString(DIRECTIVE) }(.*)`);

const AttrDirective = Directive.extend({
    init(ele, directiveAttr) {
        let dataForTokenValueGetter = null;
        let updateAlreadyQueued     = false;
        let tokenValueGetter        = createValueGetter(getAttribute(ele, directiveAttr));
        const htmlAttr              = (new RegExp(matchesDirective)).exec(directiveAttr)[1];
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
                const currentValue = getAttribute(ele, htmlAttr);
                let newValue;
                try {
                    newValue = tokenValueGetter(dataForTokenValueGetter || {});
                }
                catch(e) {
                    console.error(e);
                }
                unsetDependencyTracker(updater);
                updateAlreadyQueued = false;

                if (newValue && currentValue !== newValue) {
                    setAttribute(ele, htmlAttr, newValue);
                }
                else if (currentValue && !newValue) {
                    removeAttribute(ele, htmlAttr);
                }
            });
        };
        const inst = { updater };

        PRIVATE.set(this, inst);
        removeAttribute(ele, directiveAttr);

        this.onDestroy(() => {
            dataForTokenValueGetter = tokenValueGetter = null;
            deferExec(() => {
                stopDependeeNotifications(updater);
                this.getFactory().getDestroyCallback(inst, PRIVATE)();
            });
        });
    }
});

export default AttrDirective;

AttrDirective.has = function (ele) {
    let directiveAttr = "";
    getNodeAttrNames(ele).some(attr => matchesDirective.test(attr) && (directiveAttr = attr));
    return directiveAttr;
};