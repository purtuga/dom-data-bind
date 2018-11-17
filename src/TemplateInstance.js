import {arraySlice} from "./utils.js";

/**
 * Interface for a template instance.
 */
export class TemplateInstance {
    /**
     *
     * @param {DocumentFragment} docFrag
     * @param {Array<NodeHandler>} bindings
     * @param {String} [templateId]
     */
    constructor(docFrag, bindings, templateId = "") {
        this._frag = docFrag;
        this._bindings = bindings;
        this._childNodes = arraySlice(docFrag.childNodes, 0);
        this.fromTemplateId = templateId;
    }

    /**
     * Recovers the original nodes rendered from the template into
     * the DocumentFragment
     */
    recover() {
        this._childNodes.forEach(nodeEle => this._frag.appendChild(nodeEle));
    }

    /**
     * Destroys all bindings of the Template
     */
    destroy() {
        if (this._bindings) {
            for (let i = 0, t = this._bindings.length; i < t; i++) {
                this._bindings[i].destroy();
            }
            this._bindings.length = 0;
        }
    }

    /**
     * Sets data on the Template by passing it to all directives to act on.
     * @param data
     */
    setData(data) {
        for (let i = 0, t = this._bindings.length; i < t; i++) {
            this._bindings[i].render(data);
        }
    }
}
