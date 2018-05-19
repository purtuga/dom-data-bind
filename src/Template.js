import {makeObservable} from "observables/src/objectWatchProp";
import domFind from "common-micro-libs/src/domutils/domFind"
import {
    PRIVATE,
    UUID,
    bindCallTo,
    removeAttribute,
    getAttribute,
    arrayForEach,
    createComment,
    createDocFragment,
    createTextNode,
    logError        }   from "./utils"
import TextBinding      from "./bindings/text-binding"
//=========================================================================================
const DATA_TOKEN_REG_EXP_STR    = "\{\{(.*?)\}\}";
const DROPS_NODES_ON_CLONE = (() => {
    const frag = createDocFragment();
    frag.appendChild(createTextNode("test"));
    frag.appendChild(createTextNode(""));
    return frag.cloneNode(true).childNodes.length === 1;
})();

// Local aliases
const nodeSplitText         = bindCallTo(Text.prototype.splitText);

// short helpers
const reHasDataToken        = new RegExp(DATA_TOKEN_REG_EXP_STR);
const reTokenMatch          = new RegExp(DATA_TOKEN_REG_EXP_STR, "g");
const getNodeValue          = node => node ? node.nodeValue : "";
const hasToken              = node => reHasDataToken.test(getNodeValue(node));


/**
 * A Dom template along with its set of know directives (after parsing it)
 */
export class Template {
    constructor(html, directives = []) {
        this._template = document.createElement("template");
        this._template.innerHTML = html;

        // FIXME: Find directives and bindings
        this._bindings = getBindingFor(this._template.content, directives);
    }

    /**
     * Creates new DOM Element based on this template, initilizes directives
     * and then applys the data to it.
     */
    cloneWith(data = {}) {
        makeObservable(data);
        const response = document.importNode(this._template.content, true);
        response._domDataBindNodeHandlers = applyBindings(response, this._bindings);
        response._domDataBindNodeHandlers.forEach(nodeHandler =>
            nodeHandler.render(data)
        );
        return response;
    }
}
export default Template;


/**
 * Returns a Map() that includes the paths to nodes in the Dom template that
 * are using Directives or have bindings.
 * The map "key" is an array of `childNodes` paths from the root of the template
 * all the way to the node.
 * The map "value" is an array Directive instances for that node
 *
 * @return {Map}
 */
export function getBindingFor(ele, directives) {
    // FIXME: refactor this entire function to be faster and more efficient


    // template bindings Map() structure:
    //
    //      bindings = Map(
    //          [path, via, childNodes, to, element]: [ directive instances ],
    //          // example:
    //          [0,1,3]: [ directiveInstance1, directiveInstance2 ]
    //      )
    //  }
    //

    // The goal is to be able to provide a path to each elements for which a group of directives will be applied.
    const bindings          = new Map();
    const eleToBindings     = new Map();
    const ignoredChildren   = new Set();
    let domEle;

    const directiveIterator = Directive => {
        let attrName;
        let attrValue;
        let managesNode;

        while (attrName = Directive.has(domEle)) {
            attrValue = getAttribute(domEle, attrName);
            getArrayForNodeFromMap(eleToBindings, domEle).push(getDirectiveForAttribute(Directive, attrName, attrValue));
            removeAttribute(domEle, attrName);
            managesNode = Directive.manages();


            // FIXME: Better if we remove the node from DOM and later, replace it with the placeholder
            if (managesNode) {
                ignoredChildren.add(domEle);
            }
        }
        return managesNode;
    };

    const processTextNode = child => {
        if (hasToken(child)) {
            reTokenMatch.lastIndex = 0;
            let nodeValue = getNodeValue(child);
            let childTokenMatches = reTokenMatch.exec(nodeValue);

            while (childTokenMatches) {
                // If no need to split the text node, then just create a binding for it and exit
                if (nodeValue === "{{" + childTokenMatches[1] + "}}") {
                    getArrayForNodeFromMap(eleToBindings, child).push(getTextBindingForToken(TextBinding, childTokenMatches[1]));
                    childTokenMatches = null;
                }
                else {
                    let tokenTextNode = nodeSplitText(child, childTokenMatches.index);

                    // IF browser drops empty nodes, then fix the child node (which now is the left portion
                    // of the split)
                    if (DROPS_NODES_ON_CLONE) {
                        fixEmptyTextNode(child);
                    }

                    // FIXME: need to handle empty node when browser does not do clones correctly (IE for sure... Edge might be fixed now)

                    // Split again at the end of token, so that we have a dedicated text node for the token value.
                    // Because we'll be using this as a template, well also need to replace this token value node
                    // with an HTML comment, which will be replaced later during directive initialization
                    const remainingText = nodeSplitText(tokenTextNode, childTokenMatches[0].length);
                    const tokenPlaceholder = tokenTextNode.parentNode.insertBefore(createComment(UUID), tokenTextNode);
                    tokenTextNode.parentNode.removeChild(tokenTextNode);

                    getArrayForNodeFromMap(eleToBindings, tokenPlaceholder).push(getTextBindingForToken(TextBinding, childTokenMatches[1]));

                    // Execute the regular expression again on the remaining text
                    childTokenMatches = reTokenMatch.exec(getNodeValue(remainingText));

                    if (!childTokenMatches && DROPS_NODES_ON_CLONE) {
                        fixEmptyTextNode(remainingText);
                    }
                }
            }
        }
    };

    findAllNodes(ele).forEach(node => {
        let skip = false;

        if (ignoredChildren.size) {
            for (let ignoredParent of ignoredChildren.values()) {
                if (ignoredParent.contains(node)) {
                    skip = true;
                    break;
                }
            }
        }

        domEle = node;

        if (!skip) {
            // Process Element level Directives
            if (node.nodeType === 1) {
                directives.some(directiveIterator);
            }
            // TEXT nodes
            else if (node.nodeType === 3) {
                processTextNode(node);
            }
        }
    });

    domEle = null;


    // Create the list array of node indexes for each binding processed
    eleToBindings.forEach((directiveBindings, bindingEle) => {
        if (ele === bindingEle) {
            bindings.set([], directiveBindings);
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

        bindings.set(path, directiveBindings);
    });

    eleToBindings.clear();
    ignoredChildren.clear();

    return bindings;
}

/**
 * Applies the bindings in the given Map to the DocumentFragment provided on input.
 *
 * @param {DocumentFragment} frag
 * @param {Map<Array<Number>, Array<Directive>>} bindings
 *
 * @return {Array<NodeHandler>}
 *  An array of Node directive handlers is returned.
 */
export function applyBindings(frag, bindings) {
    const response = [];

    bindings.forEach((directives, path) => {
        const node = getNodeAt(frag, path);
        if (!node) {
            logError(new Error(`dom-data-bind#render(): Unable to find node!`));
            return;
        }

        for (let i=0, t=directives.length; i < t; i++) {
            response.push(directives[i].getNodeHandler(node));
        }
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

/**
 *
 * @private
 * @param {HTMLElement} ele
 * @returns {boolean}
 */
function onlyElementsWithAttributes(ele/*, index, arr*/) {
    return ele.nodeType !== 1 || (ele.nodeType === 1 && ele.attributes.length > 0);
}

/**
 *
 * @private
 * @param {Array} resultArr
 * @param {HTMLElement} ele
 * @returns {Array}
 */
function addTextNodes(resultArr, ele /*, index, arr*/) {
    resultArr.push(ele);
    if (ele.hasChildNodes()) {
        ele = ele.firstChild;
        for (;ele;) {
            const nextSibling = ele.nextSibling;

            // IF Text node and it has the token
            if (ele.nodeType === 3 && !!ele.nodeValue && reHasDataToken.test(getNodeValue(ele))) {
                resultArr.push(ele);
            }

            if (DROPS_NODES_ON_CLONE) {
                fixEmptyTextNode(ele);
            }

            ele = nextSibling;
        }
    }
    return resultArr;
}

function fixEmptyTextNode(node) {
    if (node.nodeType === 3 && DROPS_NODES_ON_CLONE && !node.nodeValue) {
        node.parentNode.insertBefore(createComment(""), node);
        node.parentNode.removeChild(node);
    }
}

/**
 *
 * @private
 * @param {HTMLElement} ele
 *
 * @return {Array<Node>}
 */
function findAllNodes(ele) {
    return domFind(ele, "*")
        .reduce(addTextNodes, [])
        .filter(onlyElementsWithAttributes);
}

