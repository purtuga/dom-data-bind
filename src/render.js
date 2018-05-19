import Template from "./Template"


//==========================================================================
const TEMPLATES = new Map();

/**
 * Returns a DocumentFragment representation of the given `html` code provided on
 * input bound to the given data.
 *
 * @return {DocumentFragment}
 */
export function render(html, data) {
    if (!TEMPLATES.has(html)) {
        TEMPLATES.set(html, new Template(html));
    }
    return TEMPLATES.get(html).cloneWith(data);
}
export default render;
