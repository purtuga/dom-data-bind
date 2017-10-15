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
 * @param {String} directiveAttr
 *  The directive html element attribute as found in the element.
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
    }
});
export default Directive;


/**
 * Checks a given element has an element attribute that matches the Directive.
 * If a match is found, the html Element's attribute that was matched must be
 * returned.
 *
 * @param {HTMLElement} ele
 *
 * @returns {String}
 */
Directive.has = function (/*ele*/) {
    return "";
};