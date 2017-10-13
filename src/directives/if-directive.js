import Compose from "common-micro-libs/src/jsutils/Compose"

import { escapeString } from "../utils"

//============================================
const DIRECTIVE             = "b:class";
const matchesDirective      = new RegExp(`^${ escapeString(DIRECTIVE) }$`);

const IfDirective = Compose.extend({
    init(ele) {
        const state = {
            value: getAttribute(ele, DIRECTIVE)
        };

        removeAttribute(ele, DIRECTIVE);

        debugger;
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