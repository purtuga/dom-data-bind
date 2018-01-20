import nextTick from "common-micro-libs/src/jsutils/nextTick"
import {
    setDependencyTracker,
    unsetDependencyTracker,
    stopDependeeNotifications } from "observable-data/src/ObservableObject"
import Directive                from "./Directive"
import {
    PRIVATE,
    escapeString,
    getAttribute,
    removeAttribute,
    setAttribute,
    createValueGetter,
    getNodeAttrNames,
    deferExec,
    logError } from "../utils"

//============================================
const attrRegExp = /^_attr\.(.*)/;

export class AttrDirective extends Directive {

    static get _matches() { return attrRegExp; }

    static get _isProp() { return false; }

    static has(ele) {
        let directiveAttr = "";
        getNodeAttrNames(ele).some(attr => this._matches.test(attr) && (directiveAttr = attr));
        return directiveAttr;
    }


    init(attr, attrValue) {
        this._attr              = attr;
        this._tokenValueGetter  = createValueGetter((attrValue || ""));
        this._htmlAttr          = (new RegExp(this.constructor._matches)).exec(attr)[1];
    }

    render(handler, node, data) {
        super.render(handler, node, data);
        let state = PRIVATE.get(handler);
        if (!state.update) {
            state.update = newValue => {
                if (this.constructor._isProp) {
                    if (newValue !== state.value) {
                        node[this._htmlAttr] = newValue;
                    }
                }
                else {
                    if (newValue && state.value !== newValue) {
                        setAttribute(node, this._htmlAttr, newValue);
                    }
                    else if (state.value && !newValue) {
                        removeAttribute(node, this._htmlAttr);
                    }
                }
            };
        }
    }
}

export default AttrDirective;



AttrDirective.__new = true; // FIXME: temp.... remove
