import Compose          from "common-micro-libs/src/jsutils/Compose"
import Map              from "common-micro-libs/src/jsutils/es6-Map"
import Set              from "common-micro-libs/src/jsutils/es6-Set"
import { makeObservable }   from "observables"
import {
    PRIVATE,
    UUID,
    bindCallTo,
    removeAttribute,
    getAttribute,
    arrayForEach,
    createComment,
    logError        }   from "./utils"
import TextBinding      from "./bindings/text-binding"

//====================================================================
const DATA_TOKEN_REG_EXP_STR    = "\{\{(.*?)\}\}";
const TEMPLATES                 = new Map();

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

        state.bindings = getBindingsFromDom(this, ele);

        if (data) {
            this.setData(data);
        }

        this.onDestroy(() => {
            arrayForEach(state.bindings, binding => binding.destroy());

            delete state.data;
            delete state.directives;
            delete state.bindings;

            Factory.getDestroyCallback(state, PRIVATE)();
        });
    },

    /**
     * Set data on to the DOM provided during initialization.
     * In most cases, you should never have the need to call this method. Data
     * provided during initialization is "live" and changes are automatically
     * reflected to dom.
     */
    setData(data) {
        makeObservable(data);
        const bindings = PRIVATE.get(this).bindings;
        arrayForEach(bindings, binding => binding.render(data));
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
        ele.textContent = "";
        arrayForEach(eleTemplate.ele.childNodes, node => {
            ele.appendChild(node.cloneNode(true));
        });
    }

    eleTemplate.bindings.forEach((directives, path) => {
        const node = getNodeAt(ele, path);
        if (!node) {
            logError(new Error(`Unable to find node!`));
            return;
        }

        arrayForEach(directives, Directive => {
            response.push(Directive.getNodeHandler(node, binder));
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

/**
 * Returns a node handlers for the given directive
 *
 * @param {Directive} Directive
 * @param {String} tokenText
 *  The token text (no curly braces)
 *
 * @returns {Directive}
 *  Returns a Directive instance. Call `.getNodeHandler` to get a handler for a given node
 */
function getTextBindingForToken(Directive, tokenText) {
    tokenText = tokenText.trim();

    let directiveInstances = PRIVATE.get(Directive);

    if (!directiveInstances) {
        directiveInstances = {};
        PRIVATE.set(Directive, directiveInstances);
    }

    if (!directiveInstances[tokenText]) {
        directiveInstances[tokenText] = new Directive(tokenText);
    }

    return directiveInstances[tokenText];
}

function getDirectiveForAttribute (Directive, attrName, attrValue) {
    attrValue = attrValue.trim();

    const directiveSignature    = `${attrName}-${ UUID }-${ attrValue }`;
    let directiveInstances      = PRIVATE.get(Directive);

    if (!directiveInstances) {
        directiveInstances = {};
        PRIVATE.set(Directive, directiveInstances);
    }

    if (!directiveInstances[directiveSignature]) {
        directiveInstances[directiveSignature] = new Directive(attrName, attrValue);
    }

    return directiveInstances[directiveSignature];
}
