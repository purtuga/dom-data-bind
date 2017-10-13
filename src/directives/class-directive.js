import Compose from "common-micro-libs/src/jsutils/Compose"

import { escapeString } from "../utils"

//============================================
const DIRECTIVE             = "b:class";
const ELEMENT_PROTOTYPE     = Element.prototype;

const getAttribute          = bindCallTo(ELEMENT_PROTOTYPE.getAttribute);
const removeAttribute       = bindCallTo(ELEMENT_PROTOTYPE.removeAttribute);
const matchesDirective      = new RegExp(`^${ escapeString(DIRECTIVE) }$`);

const ClassDirective = Compose.extend({
    init(ele) {
        const directive = this.directive;
        const state = {
            value: getAttribute(ele, directive)
        };

        removeAttribute(ele, directive);

        debugger;
    },

    get directive() {
        return DIRECTIVE;
    }
});
export default ClassDirective;

/**
 * Static method that allows to check if a given string matches this directive's string
 *
 * @method ClassDirective#is
 *
 * @param {String} directive
 *
 * @returns {boolean}
 */
ClassDirective.is = function(directive) {
    return matchesDirective.test(directive.trim());
};