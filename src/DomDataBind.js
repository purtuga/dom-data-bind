import Compose          from "common-micro-libs/src/jsutils/Compose"
import nextTick         from "common-micro-libs/src/jsutils/nextTick"
import { observeAll }   from "observable-data"
import {
    PRIVATE,
    bindCallTo  }   from "./utils"
import TextBinding  from "./bindings/text-binding"

//====================================================================
const DATA_TOKEN_REG_EXP_STR    = "\{\{(.*?)\}\}";
const ARRAY_PROTOTYPE           = Array.prototype;

// Local aliases
const _NodeFilter           = NodeFilter;
const arrayForEach          = bindCallTo(ARRAY_PROTOTYPE.forEach);
const nodeSplitText         = bindCallTo(Text.prototype.splitText);

// short helpers
const reHasDataToken        = new RegExp(DATA_TOKEN_REG_EXP_STR);
const reTokenMatch          = new RegExp(DATA_TOKEN_REG_EXP_STR, "g");
const getNodeValue          = node => node ? node.nodeValue : "";
const setNodeValue          = (node, value) => node ? node.nodeValue = value : "";
const hasToken              = node => reHasDataToken.test(getNodeValue(node));
const treeWalkerFilter      = {
    acceptNode(node) {
        if (node.nodeType === 1 && !node.attributes.length) {
            return _NodeFilter.FILTER_SKIP;
        }
        if (node.nodeType === 3 && (!node.nodeValue || node.nodeValue.indexOf("{{") === -1)) {
            return _NodeFilter.FILTER_SKIP;
        }

        return _NodeFilter.FILTER_ACCEPT;
    }
};


/**
 * Bind data to a DOM element and automatically persist changes in that data to the UI.
 * By default, this constructor provides interpolation of Text tokens found in the DOM
 * structure (represented with double curly braces: `{{ }}`). Directives can be used
 * by extending this constructor and adding them to the [directives]{@link DomDataBind.directives}
 * static property.
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

        const bindings = state.bindings = getBindingsFromDom(this, ele);
        observeAll(data);
        nextTick(() => arrayForEach(bindings, binding => binding.render(data)));

        this.onDestroy(() => {
            delete state.data;
            delete state.directives;
            delete state.bindings;

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
    const { directives }    = PRIVATE.get(binder);
    const bindings          = [];
    const domWalker         = document.createTreeWalker(ele, 5, treeWalkerFilter, false); // 5 === NodeFilter.SHOW_ELEMENT | _NodeFilter.SHOW_TEXT
    let domEle              = domWalker.currentNode;
    let priorDomEle         = domEle;
    const directiveIterator = Directive => {
        let attrName;

        while ((attrName = Directive.has(domEle)) && domEle.parentNode) {
            bindings.push(Directive.create(domEle, attrName, binder));
        }

        // If this Directive removed the element from its parent, then
        // don't do any more processing.
        if (!domEle.parentNode) {
            return true;
        }
    };
    const processTextNode = child => {
        if (hasToken(child)) {
            reTokenMatch.lastIndex = 0;
            let childTokenMatches = reTokenMatch.exec(getNodeValue(child));

            while (childTokenMatches) {
                // If no need to split the text node, then just create a binding for it and exit
                if (child.textContent === "{{" + childTokenMatches[1] + "}}") {
                    bindings.push(TextBinding.create(child, childTokenMatches[1]));
                    childTokenMatches = null;
                }
                else {
                    const tokenTextNode = nodeSplitText(child, childTokenMatches.index);

                    // Split again at the end of token, so that we have a dedicated text node for the token value.
                    nodeSplitText(tokenTextNode, childTokenMatches[0].length);

                    // Blank out the txt node and then set its value via TextBinding
                    setNodeValue(tokenTextNode, "");
                    bindings.push(TextBinding.create(tokenTextNode, childTokenMatches[1]));
                    childTokenMatches = reTokenMatch.exec(getNodeValue(child));
                }
            }
        }
    };

    while (domEle) {
        // Process Element level Directives
        if (domEle.nodeType === 1) {
            directives.some(directiveIterator);
        }
        else if (domEle.nodeType === 3) {
            processTextNode(domEle);
        }

        if (!domEle.parentNode) {
            domWalker.currentNode = priorDomEle;
        }
        else {
            priorDomEle = domEle;
        }

        domEle = domWalker.nextNode();
    }

    return bindings;
}
