import Compose              from "common-micro-libs/src/jsutils/Compose"
import { makeObservable }   from "observable-data/src/ObservableObject"
import {
    PRIVATE,
    bindCallTo  }   from "./utils"
import TextBinding  from "./bindings/text-binding"

//====================================================================
const DATA_TOKEN_REG_EXP_STR    = "\{\{(.*?)\}\}";
const ARRAY_PROTOTYPE           = Array.prototype;

// Local aliases
const arraySlice            = bindCallTo(ARRAY_PROTOTYPE.slice);
const arrayForEach          = bindCallTo(ARRAY_PROTOTYPE.forEach);
const nodeSplitText         = bindCallTo(Text.prototype.splitText);

// short helpers
const reHasDataToken        = new RegExp(DATA_TOKEN_REG_EXP_STR);
const getNodeValue          = node => node ? node.nodeValue : "";
const setNodeValue          = (node, value) => node ? node.nodeValue = value : "";
const isTextNode            = e => e && e.nodeType === 3;
const hasToken              = node => reHasDataToken.test(getNodeValue(node));

/**
 * Base DOM element binder providing only the interpolation of Text node binding any
 * token found to the data provided on input
 *
 * @class DomDataBind
 * @extends Compose
 *
 * @param {HTMLElement} ele
 *  The HTML element that will be parse and to which `data` will be bound.
 *
 * @param {Object} data
 *  An object whose data will be used to bind to `ele`.
 *
 */
const DomDataBind = Compose.extend({
    init(ele, data = {}) {
        const Factory = this.getFactory();
        const state = {
            ele,
            data,
            directives: Factory.directives.slice(0)
        };

        PRIVATE.set(this, state);

        makeObservable(data, null, true);

        const bindings = state.bindings = getBindingsFromDom(this, ele);
        arrayForEach(bindings, binding => binding.render(data));

        this.onDestroy(() => {
            delete state.ele; // Don't attempt to destroy (remove) the original DOM element
            arrayForEach(bindings, binding => binding.destroy());
            Factory.getDestroyCallback(state, PRIVATE)();
        })
    }
});
export default DomDataBind;

/**
 * A list of Directives to be used.
 *
 * @name DomDataBind.directives
 * @type {Array}
 */
DomDataBind.directives = [];


function getBindingsFromDom(binder, ele) {
    const { directives } = PRIVATE.get(binder);
    const bindings = [];
    const children = arraySlice(ele.childNodes);

    // Process Element level Directives
    directives.some(Directive => {
        const attrName = Directive.has(ele);

        if (!attrName) {
            return;
        }

        bindings.push(Directive.create(ele, attrName, binder));

        // If this Directive removed the element from its parent, then
        // don't do any more processing.
        if (!ele.parentNode) {
            return true;
        }
    });

    if (!children.length || !ele.parentNode) {
        return bindings;
    }

    let child;
    while ((child = children.shift())) {
        if (isTextNode(child) && hasToken(child)) {
            const reTokenMatch = new RegExp(DATA_TOKEN_REG_EXP_STR, "g");
            let childTokenMatches = reTokenMatch.exec(getNodeValue(child));

            while (childTokenMatches) {
                const tokenText     = childTokenMatches[1];
                const tokenTextNode = nodeSplitText(child, childTokenMatches.index);

                // Throw the remainder of the text node into the list of children so that it can be processed
                children.push(nodeSplitText(tokenTextNode, childTokenMatches[0].length));

                // Blank out the txt node and then set its value via TextBinding
                setNodeValue(tokenTextNode, "");
                bindings.push(TextBinding.create(tokenTextNode, tokenText));
                childTokenMatches = reTokenMatch.exec(getNodeValue(child));
            }

        }
        else if (!isTextNode(child)) {
            bindings.push(...getBindingsFromDom(binder, child));
        }
    }

    return bindings;
}
