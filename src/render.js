import {view} from "./view.js";
import {DOM_DATA_BIND_PROP} from "./utils.js";
import {TemplateInstance} from "./TemplateInstance.js";
import {applyBindingsToTemplateInstance, Template} from "./Template.js";


//==========================================================================

/**
 * Returns a DocumentFragment representation of the given `html` code provided on
 * input bound to the given data.
 *
 * @param {String|HTMLTemplateElement|Template} html
 * @param {Object} [data]
 * @param {Array<Directive>} [directives]
 *
 * @return {DocumentFragment}
 *  Document Fragment returned will have a property named 'DomDataBind', which is
 *  a TemplateInstance class instance
 */
export function render(html, data, directives) {
    const viewTemplate = html instanceof Template ? html : view(html, directives);
    const response = document.importNode(viewTemplate.ele.content, true);

    response[DOM_DATA_BIND_PROP] = new TemplateInstance(
        response,
        applyBindingsToTemplateInstance(response, viewTemplate._bindings, viewTemplate._directives),
        viewTemplate.id
    );
    response[DOM_DATA_BIND_PROP].setData(data);
    return response;
}

export default render;
