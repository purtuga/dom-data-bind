import Compose      from "common-micro-libs/src/jsutils/Compose"

import { PRIVATE } from "./utils"
// import nextTick     from "common-micro-libs/src/jsutils/nextTick"

//====================================================================
const DATA_TOKEN_REG_EXP_STR    = "\{\{(.*?)\}\}";
const ARRAY_PROTOTYPE           = Array.prototype;
// const ELEMENT_PROTOTYPE         = Element.prototype;

// Local aliases
const bindCallTo            = Function.call.bind.bind(Function.call);
const arraySlice            = bindCallTo(ARRAY_PROTOTYPE.slice);
const arrayForEach          = bindCallTo(ARRAY_PROTOTYPE.forEach);
const nodeSplitText         = bindCallTo(Text.prototype.splitText);
// const getAttribute          = bindCallTo(ELEMENT_PROTOTYPE.getAttribute);
// const removeAttribute       = bindCallTo(ELEMENT_PROTOTYPE.removeAttribute);

// short helpers
const reHasDataToken        = new RegExp(DATA_TOKEN_REG_EXP_STR);
const getNodeValue          = node => node ? node.nodeValue : "";
const setNodeValue          = (node, value) => node ? node.nodeValue = value : "";
const isTextNode            = e => e && e.nodeType === 3;
const hasToken              = node => reHasDataToken.test(getNodeValue(node));


const DomDataBind = Compose.extend({
    init(ele, data) {
        const state = {
            data
        };

        PRIVATE.set(this, state);

        state.bindings = getBindingsFromDom(ele);
    }
});
export default DomDataBind;

function getNodeAttrNames(node){
    if (!node.hasAttributes()) {
        return [];
    }

    const attrs = node.attributes;
    let attrNames = [];

    for(let i = attrs.length - 1; i >= 0; i--) {
        attrNames.push(attrs[i].name);
    }

    return attrNames;
}


function getBindingsFromDom(ele) {
    const bindings = [];
    const children = arraySlice(ele.childNodes);

    // Process Element level Directives
    arrayForEach(getNodeAttrNames(ele), attrName => {
        [ CssClassDirective ].some(DirectiveClass => {
            if (DirectiveClass.is(attrName)) {
                bindings.push(new DirectiveClass(ele));
                return true;
            }
        });
    });

    if (!children.length) {
        return [];
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
                bindings.push(new TextBinding(tokenTextNode, tokenText));
                childTokenMatches = reTokenMatch.exec(getNodeValue(child));
            }

        }

        if (child.childNodes.length) {
            bindings.push(...getBindingsFromDom(child));
        }
    }

    return bindings;
}