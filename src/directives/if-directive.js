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
    createComment,
    insertBefore,
    removeChild,
    createValueGetter } from "../utils"

//============================================
const DIRECTIVE             = "b-if";
const matchesDirective      = new RegExp(`^${ escapeString(DIRECTIVE) }$`);

const IfDirective = Directive.extend({
    init(ele) {
        let dataForTokenValueGetter = {};
        let updateAlreadyQueued     = false;
        let showElement             = true;
        const eleParentNode         = ele.parentNode;
        const isVisible             = () => !!ele.parentNode;
        let tokenValueGetter        = createValueGetter(getAttribute(ele, DIRECTIVE));
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
        removeAttribute(ele, DIRECTIVE);

        insertBefore(eleParentNode, placeholderEle, ele);
        removeChild(eleParentNode, ele);

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
export default IfDirective;

/**
 * Static method that allows to check if a given string matches this directive's string
 *
 * @method IfDirective#is
 *
 * @param {String} directive
 *
 * @returns {boolean}
 */
IfDirective.is = function(directive) {
    return matchesDirective.test(directive.trim());
};