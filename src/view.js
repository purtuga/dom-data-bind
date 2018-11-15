import Template from "./Template.js"
import {isString} from "./utils.js";
import {isTemplate} from "./utils.js";


//==========================================================================
// Keeps a map between `html string` and `Template` instance
const TEMPLATES = new Map();

/**
 * Create a UI view template for the given html string. Returned view (Template) are cached (memoized)
 * and thus a previously view template will just return the previous Template instance
 *
 * @param {String|HTMLTemplateElement} html
 * @param {Array<Directive>} directives
 *
 * @returns {HTMLTemplateElement}
 */
export function view(html, directives = view.directives || []) {
    const isHtmlString = isString(html);
    const cacheKey = isHtmlString ? html : html.innerHTML;

    if (!hasTemplate(cacheKey)) {
        TEMPLATES.set(
            cacheKey,
            new Template(html, directives)
        );
    }

    // DEVELOPMENT MODE (is removed during webpack build)
    if (process.env.NODE_ENV !== "production") {
        if (!isString(html) && !isTemplate(html)) {
            console.warn(`dom-data-bind.view(): 'html' argument must be either String or HTMLTemplateElement!`); //eslint-disable-line
        }
    }

    return TEMPLATES.get(cacheKey);
}

/**
 * A list of directives that might be used in views. Used as the default value to the
 * `directives` input argument of `view()`.
 *
 * @type {Array<Directive>>|null}
 */
view.directives = null;

/**
 * Checks if a view template already exists for the given html
 *
 * @type {function(*=): boolean}
 */
view.has = hasTemplate;

/**
 * Checks if a view template already exists for the given html
 * @param html
 * @returns {boolean}
 */
function hasTemplate(html) {
    return TEMPLATES.has(html);
}
