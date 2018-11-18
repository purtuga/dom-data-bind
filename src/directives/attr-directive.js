import Directive                from "./Directive"
import {
    PRIVATE,
    removeAttribute,
    setAttribute,
    createValueGetter,
    getNodeAttrNames } from "../utils"
import {NodeHandler} from "./NodeHandler.js";

//============================================
const attrRegExp = /^_attr\.(.*)/;

export class AttrDirective extends Directive {
    static NodeHandlerConstructor = class extends NodeHandler {
        update(newValue) {
            const state = PRIVATE.get(this);
            const _htmlAttr = this._directive._htmlAttr;

            if (this._directive.constructor._isProp) {
                if (newValue !== state.value) {
                    this._node[_htmlAttr] = newValue;
                }
            }
            else {
                if (newValue && state.value !== newValue) {
                    setAttribute(this._node, _htmlAttr, newValue);
                }
                else if (state.value && !newValue) {
                    removeAttribute(this._node, _htmlAttr);
                }
            }
        }
    };

    static _matches = attrRegExp;

    static _isProp = false;

    static has(ele) {
        let directiveAttr = "";
        getNodeAttrNames(ele).some(attr => this._matches.test(attr) && (directiveAttr = attr));
        return directiveAttr;
    }

    init(attr, attrValue) {
        this._attr              = attr;
        this._tokenValueGetter  = createValueGetter((attrValue || ""), "attr");
        this._htmlAttr          = (new RegExp(this.constructor._matches)).exec(attr)[1];
    }
}

export default AttrDirective;
