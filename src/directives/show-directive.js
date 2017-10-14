import nextTick from "common-micro-libs/src/jsutils/nextTick"
import {
    setDependencyTracker,
    unsetDependencyTracker,
    stopDependeeNotifications } from "observable-data/src/ObservableObject"

import Directive from "./Directive"
import {
    PRIVATE,
    escapeString,
    getAttribute,
    removeAttribute,
    createValueGetter } from "../utils"

//============================================
const DIRECTIVE             = "b-show";
const matchesDirective      = new RegExp(`^${ escapeString(DIRECTIVE) }$`);
const HIDDEN                = "none";

const ShowDirective = Directive.extend({
    init(ele) {
        let dataForTokenValueGetter = {};
        let updateAlreadyQueued     = false;
        let showElement             = true;
        const eleStyleList          = ele.style;
        const eleDisplayStyle       = eleStyleList.display;
        let tokenValueGetter        = createValueGetter(getAttribute(ele, DIRECTIVE));
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
        removeAttribute(ele, DIRECTIVE);

        this.onDestroy(() => {
            stopDependeeNotifications(updater);
            this.getFactory().getDestroyCallback(inst, PRIVATE)();
            dataForTokenValueGetter = tokenValueGetter = null;
        });
    },

    get directive() {
        return DIRECTIVE;
    }
});
export default ShowDirective;

/**
 * Static method that allows to check if a given string matches this directive's string
 *
 * @method ShowDirective#is
 *
 * @param {String} directive
 *
 * @returns {boolean}
 */
ShowDirective.is = function(directive) {
    return matchesDirective.test(directive.trim());
};