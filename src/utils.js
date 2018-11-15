import dataStore    from "@purtuga/common/src/jsutils/dataStore"
import Map          from "@purtuga/common/src/jsutils/es6-Map"

//=====================================================
const DOCUMENT              = document;
const FUNCTION              = Function;
const ELEMENT_PROTOTYPE     = Element.prototype;
const ARRAY_PROTOTYPE       = Array.prototype;
const VALUE_GETTERS         = new Map();
const _bind                 = FUNCTION.bind.call.bind(FUNCTION.bind);

export const DOM_DATA_BIND_PROP = "DomDataBind";
export const PRIVATE            = dataStore.create();
export const UUID               = `D-${ Date.now() }-${ Math.random().toString(36).replace(/[^a-z0-9]+/g, '') }`;
export const escapeString       = str => String(str).replace(/[-[\]/{}()*+?.\\^$|]/g, "\\$&");
export const bindCallTo         = _bind(FUNCTION.call.bind, FUNCTION.call); // FIXME: replace with common-micro-libs runtime-aliases
export const isPureObject       = o => Object.prototype.toString.call(o) === "[object Object]";  // FIXME: replace with common-micro-libs runtime-aliases
export const isString           = s => "string" === typeof s;// FIXME: replace with common-micro-libs runtime-aliases
export const arrayForEach       = bindCallTo(ARRAY_PROTOTYPE.forEach);// FIXME: replace with common-micro-libs runtime-aliases
export const arraySlice         = bindCallTo(ARRAY_PROTOTYPE.slice);// FIXME: replace with common-micro-libs runtime-aliases
export const hasAttribute       = bindCallTo(ELEMENT_PROTOTYPE.hasAttribute);// FIXME: replace with common-micro-libs runtime-aliases
export const getAttribute       = bindCallTo(ELEMENT_PROTOTYPE.getAttribute);// FIXME: replace with common-micro-libs runtime-aliases
export const setAttribute       = bindCallTo(ELEMENT_PROTOTYPE.setAttribute);// FIXME: replace with common-micro-libs runtime-aliases
export const removeAttribute    = bindCallTo(ELEMENT_PROTOTYPE.removeAttribute);// FIXME: replace with common-micro-libs runtime-aliases
export const insertBefore       = bindCallTo(ELEMENT_PROTOTYPE.insertBefore);// FIXME: replace with common-micro-libs runtime-aliases
export const removeChild        = bindCallTo(ELEMENT_PROTOTYPE.removeChild);// FIXME: replace with common-micro-libs runtime-aliases
export const createComment      = _bind(DOCUMENT.createComment, DOCUMENT);// FIXME: replace with common-micro-libs runtime-aliases
export const createElement      = _bind(DOCUMENT.createElement, DOCUMENT);// FIXME: replace with common-micro-libs runtime-aliases
export const createTextNode     = _bind(DOCUMENT.createTextNode, DOCUMENT);// FIXME: replace with common-micro-libs runtime-aliases
export const createDocFragment  = _bind(DOCUMENT.createDocumentFragment, DOCUMENT);// FIXME: replace with common-micro-libs runtime-aliases
export const isTemplate         = e => Object.prototype.toString.call(e) === "[object HTMLTemplateElement]"; // FIXME: replace with common-micro-libs runtime-aliases
// FIXME: replace with common-micro-libs runtime-aliases
export const logError           = _bind(console.error, console); // eslint-disable-line



export function createValueGetter(evalCode) {
    evalCode = evalCode.trim();

    if (VALUE_GETTERS.has(evalCode)) {
        return VALUE_GETTERS.get(evalCode);
    }

    // FIXME: should we add a sourceURL to the code below so it shows up on the sources panel?
    //                      # sourceURL=runtime.1.js

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
    const attrNames = [];
    const total = node.attributes.length;

    for(let i = 0; i < total; i++) {
        attrNames.push(node.attributes.item(i).name);
    }

    return attrNames;
}