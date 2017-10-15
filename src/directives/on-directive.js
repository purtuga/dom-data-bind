import domAddEventListener from "common-micro-libs/src/domutils/domAddEventListener"
import Directive           from "./Directive"
import {
    PRIVATE,
    escapeString,
    getAttribute,
    removeAttribute,
    createValueGetter } from "../utils"

//============================================
const DIRECTIVE             = "b:on.";
const matchesDirective      = new RegExp(`^${ escapeString(DIRECTIVE) }(.*)`);

const OnDirective = Directive.extend({
    init(ele, directiveAttr) {
        let dataForTokenValueGetter = {};
        let tokenValueGetter        = createValueGetter(getAttribute(ele, directiveAttr));
        let eventCallback;
        let evListener;
        const eventName         = (new RegExp(matchesDirective)).exec(directiveAttr)[1];
        const updater           = data => {
            if (data) {
                dataForTokenValueGetter = data;
            }

            let newEventCallback;

            try {
                newEventCallback = tokenValueGetter(dataForTokenValueGetter);
            }
            catch(e) {
                console.error(e);
                return;
            }

            if (evListener && newEventCallback === eventCallback) {
                return;
            }

            eventCallback = newEventCallback;

            if (evListener) {
                evListener.remove();
            }

            evListener = inst.evListener = domAddEventListener(ele, eventName, eventCallback);
        };
        const inst = { updater };

        PRIVATE.set(this, inst);
        removeAttribute(ele, directiveAttr);

        this.onDestroy(() => {
            this.getFactory().getDestroyCallback(inst, PRIVATE)();
            tokenValueGetter = evListener = null;
        });
    },

    get directive() {
        return DIRECTIVE;
    }
});
export default OnDirective;

/**
 * Static method that allows to check if a given string matches this directive's string
 *
 * @method OnDirective#is
 *
 * @param {String} directive
 *
 * @returns {boolean}
 */
OnDirective.is = function(directive) {
    return matchesDirective.test(directive.trim());
};