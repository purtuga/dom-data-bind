import Directive                from "./Directive"
import {
    PRIVATE,
    createValueGetter,
    hasAttribute } from "../utils"
import {NodeHandler} from "./NodeHandler.js";
//============================================
const DIRECTIVE = "_html";

export class HtmlDirective extends Directive {
    static NodeHandlerConstructor = class extends NodeHandler {
        update(newValue) {
            if (newValue === PRIVATE.get(this).value) {
                return;
            }

            this._node.innerHTML = newValue;
        }
    };

    static has(ele) {
        return hasAttribute(ele, DIRECTIVE) ? DIRECTIVE : "";
    }

    init(attr, attrValue) {
        this._attr              = attr;
        this._tokenValueGetter  = createValueGetter((attrValue || ""), "html");
    }
}

export default HtmlDirective;

