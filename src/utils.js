import dataStore    from "common-micro-libs/src/jsutils/dataStore"
import Map          from "common-micro-libs/src/jsutils/es6-Map"

//=====================================================
const DOCUMENT              = document;
const FUNCTION              = Function;
const ELEMENT_PROTOTYPE     = Element.prototype;
const ARRAY_PROTOTYPE       = Array.prototype;
const VALUE_GETTERS         = new Map();
const _bind                 = FUNCTION.bind.call.bind(FUNCTION.bind);

export const PRIVATE = dataStore.create();

export const escapeString       = str => String(str).replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
export const bindCallTo         = _bind(FUNCTION.call.bind, FUNCTION.call);
export const isPureObject       = o => Object.prototype.toString.call(o) === "[object Object]";
export const arrayForEach       = bindCallTo(ARRAY_PROTOTYPE.forEach);
export const hasAttribute       = bindCallTo(ELEMENT_PROTOTYPE.hasAttribute);
export const getAttribute       = bindCallTo(ELEMENT_PROTOTYPE.getAttribute);
export const setAttribute       = bindCallTo(ELEMENT_PROTOTYPE.setAttribute);
export const removeAttribute    = bindCallTo(ELEMENT_PROTOTYPE.removeAttribute);
export const insertBefore       = bindCallTo(ELEMENT_PROTOTYPE.insertBefore);
export const removeChild        = bindCallTo(ELEMENT_PROTOTYPE.removeChild);
export const createComment      = _bind(DOCUMENT.createComment, DOCUMENT);

export function createValueGetter(evalCode) {
    if (VALUE_GETTERS.has(evalCode)) {
        return VALUE_GETTERS.get(evalCode);
    }

    const fn = new FUNCTION("$data", `
with ($data) {
    if ($data) {
        with ($data) {
            return ${ evalCode };
        }
    } 
    else {
        return ${ evalCode };
    }
}
`);
    VALUE_GETTERS.set(evalCode, fn);
    return fn;
}

export function getNodeAttrNames(node){
    let attrNames = [];

    for(let i = node.attributes.length - 1; i >= 0; i--) {
        attrNames.push(node.attributes.item(i).name);
    }

    return attrNames;
}