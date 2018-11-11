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
export const bindCallTo         = _bind(FUNCTION.call.bind, FUNCTION.call);
export const isPureObject       = o => Object.prototype.toString.call(o) === "[object Object]";
export const isString           = s => "string" === typeof s;
export const arrayForEach       = bindCallTo(ARRAY_PROTOTYPE.forEach);
export const arraySlice         = bindCallTo(ARRAY_PROTOTYPE.slice);
export const hasAttribute       = bindCallTo(ELEMENT_PROTOTYPE.hasAttribute);
export const getAttribute       = bindCallTo(ELEMENT_PROTOTYPE.getAttribute);
export const setAttribute       = bindCallTo(ELEMENT_PROTOTYPE.setAttribute);
export const removeAttribute    = bindCallTo(ELEMENT_PROTOTYPE.removeAttribute);
export const insertBefore       = bindCallTo(ELEMENT_PROTOTYPE.insertBefore);
export const removeChild        = bindCallTo(ELEMENT_PROTOTYPE.removeChild);
export const createComment      = _bind(DOCUMENT.createComment, DOCUMENT);
export const createTextNode     = _bind(DOCUMENT.createTextNode, DOCUMENT);
export const createDocFragment  = _bind(DOCUMENT.createDocumentFragment, DOCUMENT);
export const logError           = _bind(console.error, console); // eslint-disable-line


export function createValueGetter(evalCode) {
    evalCode = evalCode.trim();

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
    const attrNames = [];
    const total = node.attributes.length;

    for(let i = 0; i < total; i++) {
        attrNames.push(node.attributes.item(i).name);
    }

    return attrNames;
}