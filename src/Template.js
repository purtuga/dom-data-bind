import {makeObservable} from "observables/src/objectWatchProp";
import domFind from "common-micro-libs/src/domutils/domFind"
import {
    PRIVATE,
    UUID,
    DOM_DATA_BIND_PROP,
    bindCallTo,
    removeAttribute,
    getAttribute,
    arrayForEach,
    createComment,
    createDocFragment,
    createTextNode,
    logError
} from "./utils"
import TextBinding from "./bindings/text-binding"
//=========================================================================================
const DATA_TOKEN_REG_EXP_STR    = "{{(.*?)}}";
const DROPS_NODES_ON_CLONE = (() => {   // FUCK YOU IE!
    const frag = createDocFragment();
    frag.appendChild(createTextNode("test"));
    frag.appendChild(createTextNode(""));
    return frag.cloneNode(true).childNodes.length === 1;
})();
const NODE_CONTAINS_MISSES_TEXT_NODES = (() => {    // FUCK YOU IE!
    const div = document.createElement("div");
    const text = createTextNode("test");
    div.appendChild(text);
    return !div.contains(text);
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
        this._directives = directives;
        this._bindings = getBindingFor(this._template.content, directives);
    }

    /**
     * Creates new DOM Element based on this template, initilizes directives
     * and then applies the data to it.
     *
     * @param {Object} [data]
     *
     * @return {DocumentFragment}
     *  Document Fragment returned will have a property named 'DomDataBind', which is
     *  a TemplateInstance class instance
     */
    cloneWith(data = {}) {
        makeObservable(data);
        const response = document.importNode(this._template.content, true);
        response[DOM_DATA_BIND_PROP] = new TemplateInstance(
            response,
            applyBindingsToTemplateInstance(response, this._bindings, this._directives)
        );
        response[DOM_DATA_BIND_PROP].setData(data);
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
    const bindings          = new Map(); // FIXME: these can be global and reusable - since we only ever have one call in flight to this function
    const eleToBindings     = new Map();
    const ignoredChildren   = new Set();
    let domEle;

    const directiveIterator = Directive => {
        let attrName;
        let attrValue;
        let managesNode;
        let elePlaceholder = domEle;

        while ((attrName = Directive.has(domEle))) {
            attrValue = getAttribute(domEle, attrName);
            managesNode = Directive.manages();

            if (managesNode) {
                elePlaceholder = createComment("");
            }

            getArrayForNodeFromMap(eleToBindings, elePlaceholder).push(
                getDirectiveForAttribute(Directive, attrName, attrValue)
            );

            removeAttribute(domEle, attrName);

            if (managesNode) {
                ignoredChildren.add(domEle);

                // Replace this node with a Comment, and store the node's html
                // as the comment data, which is then used by the directive instance
                // to `render()` it to DOM when applicable
                domEle.parentNode.insertBefore(elePlaceholder, domEle);
                const fakeEle = document.createElement("div");
                fakeEle.appendChild(domEle);
                elePlaceholder.data = fakeEle.innerHTML;
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
                    // Because this will be used as a template, also need to replace this token value node
                    // with an HTML comment, which will be replaced later during directive initialization
                    // The remainder of the Text value is assigned back to `child` so that we can continue
                    // to check it for other text tokens.
                    child = nodeSplitText(tokenTextNode, childTokenMatches[0].length);
                    const tokenPlaceholder = tokenTextNode.parentNode.insertBefore(createComment(UUID), tokenTextNode);
                    tokenTextNode.parentNode.removeChild(tokenTextNode);

                    getArrayForNodeFromMap(eleToBindings, tokenPlaceholder).push(getTextBindingForToken(TextBinding, childTokenMatches[1]));

                    // Reset the regular expression (since `child` was also "reset") and execute
                    // the regular expression again on the remaining text
                    reTokenMatch.lastIndex = 0;
                    childTokenMatches = reTokenMatch.exec(getNodeValue(child));

                    if (!childTokenMatches && DROPS_NODES_ON_CLONE) {
                        fixEmptyTextNode(child);
                    }
                }
            }
        }
    };

    findAllNodes(ele).forEach(node => {
        let skip = false;

        if (ignoredChildren.size) {
            for (let ignoredParent of ignoredChildren.values()) {
                if (NODE_CONTAINS_MISSES_TEXT_NODES && node.nodeType === 3) {
                    if (!!(ignoredParent.compareDocumentPosition(node) & 16)) {
                        skip = true;
                    }
                }
                else if (ignoredParent.contains(node)) {
                    skip = true;
                }

                if (skip) {
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
 * @param {Array<Directive>} Directives
 *
 * @return {Array<NodeHandler>}
 *  An array of Node directive handlers is returned.
 */
export function applyBindingsToTemplateInstance(frag, bindings, Directives) {
    const response = [];

    bindings.forEach((directivesInstances, path) => {
        const node = getNodeAt(frag, path);
        if (!node) {
            logError(new Error(`dom-data-bind#render(): Unable to find node!`));
            return;
        }

        for (let i=0, t=directivesInstances.length; i < t; i++) {
            response.push(directivesInstances[i].getNodeHandler(node, Directives));
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
    return [ele]
        .concat(domFind(ele, "*"))
        .reduce(addTextNodes, [])
        .filter(onlyElementsWithAttributes);
}


class TemplateInstance {
    constructor(docFrag, bindings) {
        this._frag = docFrag;
        this._bindings = bindings;
    }

    destroy() {
        if (this._bindings) {
            for (let i = 0, t = this._bindings.length; i < t; i++) {
                this._bindings[i].destroy();
            }
            this._bindings.length = 0;
        }
    }

    setData(data) {
        for (let i = 0, t = this._bindings.length; i < t; i++) {
            this._bindings[i].render(data);
        }
    }
}

