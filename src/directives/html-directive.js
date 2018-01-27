import Directive                from "./Directive"
import {
    PRIVATE,
    createValueGetter,
    hasAttribute } from "../utils"

//============================================
const DIRECTIVE = "_html";

export class HtmlDirective extends Directive {
    static has(ele) {
        return hasAttribute(ele, DIRECTIVE) ? DIRECTIVE : "";
    }


    init(attr, attrValue) {
        this._attr              = attr;
        this._tokenValueGetter  = createValueGetter((attrValue || ""));
    }

    render(handler, node, data) {
        super.render(handler, node, data);
        const state = PRIVATE.get(handler);
        if (!state.update) {
            state.update = newValue => {
                if (newValue === state.value) {
                    return;
                }

                node.innerHTML = newValue;
            }
        }
    }
}

export default HtmlDirective;

