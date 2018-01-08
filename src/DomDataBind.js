import Compose          from "common-micro-libs/src/jsutils/Compose"
import Map              from "common-micro-libs/src/jsutils/es6-Map"
import Set              from "common-micro-libs/src/jsutils/es6-Set"
import nextTick         from "common-micro-libs/src/jsutils/nextTick"
import { observeAll }   from "observable-data"
import {
    PRIVATE,
    bindCallTo,
    removeAttribute,
    getAttribute,
    arrayForEach,
    createComment   }   from "./utils"
import TextBinding      from "./bindings/text-binding"

//====================================================================
const DATA_TOKEN_REG_EXP_STR    = "\{\{(.*?)\}\}";
const TEMPLATES                 = new Map();
const UUID                      = `D-${ Date.now() }-${ Math.random().toString(36).replace(/[^a-z0-9]+/g, '') }`;

// Local aliases
const _NodeFilter           = NodeFilter;
const nodeSplitText         = bindCallTo(Text.prototype.splitText);

// short helpers
const reHasDataToken        = new RegExp(DATA_TOKEN_REG_EXP_STR);
const reTokenMatch          = new RegExp(DATA_TOKEN_REG_EXP_STR, "g");
const getNodeValue          = node => node ? node.nodeValue : "";
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
export const DomDataBind = Compose.extend({
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
        arrayForEach(bindings, binding => binding.render(data));

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
    const eleTemplate = getTemplateForDomElement(ele, binder);
    const response = [];

    if (eleTemplate.ele.hasChildNodes()) {
        ele.innerHTML = eleTemplate.ele.innerHTML;
    }

    eleTemplate.bindings.forEach((directives, path) => {
        const node = getNodeAt(ele, path);
        if (!node) {
            console.log(new Error(`Unable to find node!`));
            return;
        }

        arrayForEach(directives, Directive => {
            response.push(Directive.create(node, null, null, binder));
        });
    });

    return response;
}

function getNodeAt(root, path) {
    if (!path.length) {
        return root;
    }

    arrayForEach(path, index => root = root.childNodes[index]);
    return root;
}

/**
 * Returns the template representation for a given dom Element
 *
 * @param {HTMLElement} ele
 * @param {DomDataBind} binder
 *
 * @return {Object}
 */
function getTemplateForDomElement(ele, binder) {
    const templateId = ele.outerHTML;

    if (TEMPLATES.has(templateId)) {
        return TEMPLATES.get(templateId);
    }

    // TEMPLATE:
    //  {
    //      bindings: Map(
    //          [path via childNodes to element]: [ binding constructors ],
    //          // example:
    //          [0,1,3]: [ binding constructors ]
    //      )
    //  }
    //
    // The goal is to be able to provide a path to each elements for which a group of directives will be applied.
    const template = {
        bindings: new Map()
    };

    const eleToBindings     = new Map();
    const { directives }    = PRIVATE.get(binder);
    const domWalker         = document.createTreeWalker(ele, 5, treeWalkerFilter, false); // 5 === NodeFilter.SHOW_ELEMENT | _NodeFilter.SHOW_TEXT
    let domEle              = domWalker.currentNode;
    const ignoredChildren   = new Set();
    const directiveIterator = Directive => {
        let attrName;
        let attrValue;
        let managesNode;

        while (attrName = Directive.has(domEle)) {
            attrValue = getAttribute(domEle, attrName);
            getArrayForNodeFromMap(eleToBindings, domEle).push(getDirectiveForAttribute(Directive, attrName, attrValue));
            removeAttribute(domEle, attrName);
            managesNode = Directive.manages();

            if (managesNode) {
                ignoredChildren.add(domEle);
            }
        }
        return managesNode;
    };

    const processTextNode = child => {
        if (hasToken(child)) {
            reTokenMatch.lastIndex = 0;
            let childTokenMatches = reTokenMatch.exec(getNodeValue(child));

            while (childTokenMatches) {
                // If no need to split the text node, then just create a binding for it and exit
                if (child.textContent === "{{" + childTokenMatches[1] + "}}") {
                    getArrayForNodeFromMap(eleToBindings, child).push(getTextBindingForToken(TextBinding, childTokenMatches[1]));
                    childTokenMatches = null;
                }
                else {
                    let tokenTextNode = nodeSplitText(child, childTokenMatches.index);

                    // Split again at the end of token, so that we have a dedicated text node for the token value.
                    // Because we'll be using this as a template, well also need to replace this token value node
                    // with an HTML comment, which will be replaced later during directive initialization
                    nodeSplitText(tokenTextNode, childTokenMatches[0].length);
                    const tokenPlaceholder = tokenTextNode.parentNode.insertBefore(createComment(UUID), tokenTextNode);
                    tokenTextNode.parentNode.removeChild(tokenTextNode);

                    getArrayForNodeFromMap(eleToBindings, tokenPlaceholder).push(getTextBindingForToken(TextBinding, childTokenMatches[1]));
                    childTokenMatches = reTokenMatch.exec(getNodeValue(child));
                }
            }
        }
    };

    while (domEle) {
        let skip = false;

        if (ignoredChildren.size) {
            for (let ignoredParent of ignoredChildren.values()) {
                if (ignoredParent.contains(domEle)) {
                    skip = true;
                    break;
                }
            }
        }

        if (!skip) {
            // Process Element level Directives
            if (domEle.nodeType === 1) {
                directives.some(directiveIterator);
            }
            // TEXT nodes
            else if (domEle.nodeType === 3) {
                processTextNode(domEle);
            }
        }

        domEle = domWalker.nextNode();
    }

    // Create the list array of node indexes for each binding processed
    eleToBindings.forEach((bindings, bindingEle) => {
        if (ele === bindingEle) {
            template.bindings.set([], bindings);
            return;
        }

        const path  = [];
        let walkEle = bindingEle;
        let parent  = walkEle.parentNode;

        while (walkEle !== ele) {
            path.unshift(path.indexOf.call(parent.childNodes, walkEle));
            walkEle = walkEle.parentNode;
            parent  = walkEle.parentNode;
        }

        template.bindings.set(path, bindings);
    });

    TEMPLATES.set(templateId, template);

    eleToBindings.clear();
    ignoredChildren.clear();

    template.ele = ele.cloneNode(true);
    return template;
}

function getArrayForNodeFromMap(map, node) {
    if (!map.has(node)) {
        map.set(node, []);
    }
    return map.get(node);
}

function getTextBindingForToken(Directive, tokenText) {
    return Directive.extend({
        init(node) {
            if (node.nodeType === 8 && node.nodeValue === UUID) {
                const nodeToRemove = node;
                node = node.parentNode.insertBefore(document.createTextNode(tokenText), nodeToRemove);
                nodeToRemove.parentNode.removeChild(nodeToRemove);
            }
            Directive.prototype.init.call(this, node, tokenText);
        }
    })
}

function getDirectiveForAttribute (Directive, attrName, attrValue) {
    return Directive.extend({
        init(...args) {
            Directive.prototype.init.call(this, args[0], attrName, attrValue, args[3]);
        }
    });
}
