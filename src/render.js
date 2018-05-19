import Template from "./Template"

//==========================================================================
const TEMPLATES = new Map();

/**
 * Returns a DocumentFragment representation of the given `html` code provided on
 * input bound to the given data.
 *
 * @param {String} html
 * @param {Object} [data]
 * @param {Array} [directives]
 *
 * @return {DocumentFragment}
 */
export function render(html, data, directives) {
    if (!TEMPLATES.has(html)) {
        TEMPLATES.set(html, new Template(html, directives));
    }
    return TEMPLATES.get(html).cloneWith(data);
}
export default render;
