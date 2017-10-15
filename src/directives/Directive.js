import Compose      from "common-micro-libs/src/jsutils/Compose"
import { PRIVATE }  from "../utils"

/**
 * A DOM element directive
 *
 * @class Directive
 * @extends Compose
 *
 * @param {HTMLElement} ele
 *  The HTML element that contains the directive
 * @param {DomDataBind} binder
 *  The instance of DomDataBind that called the Directive
 */
const Directive = Compose.extend({
    /**
     * Render the Directive with given data
     *
     * @param {Object} [data]
     */
    render(data) {
        const inst = PRIVATE.get(this);
        if (inst && inst.updater) {
            inst.updater(data);
        }
    },

    /**
     * The directive string as used in the HTML element
     *
     * @type {String}
     */
    get directive() {
        return "";
    }
});
export default Directive;

/**
 * Static method that allows to check if a given string matches this directive's string
 *
 * @method Directive#is
 *
 * @param {String} directive
 *
 * @returns {boolean}
 */
Directive.is = function(/*directive*/) {
    return false;
};