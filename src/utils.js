import dataStore    from "common-micro-libs/src/jsutils/dataStore"

//=====================================================
const DOCUMENT              = document;
const FUNCTION              = Function;
const ELEMENT_PROTOTYPE     = Element.prototype;
const _bind                 = FUNCTION.bind.call.bind(FUNCTION.bind);


export const PRIVATE = dataStore.create();

export const escapeString       = str => String(str).replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
export const bindCallTo         = _bind(FUNCTION.call.bind, FUNCTION.call);
export const isPureObject       = o => Object.prototype.toString.call(o) === "[object Object]";
export const hasAttribute       = bindCallTo(ELEMENT_PROTOTYPE.hasAttribute);
export const getAttribute       = bindCallTo(ELEMENT_PROTOTYPE.getAttribute);
export const setAttribute       = bindCallTo(ELEMENT_PROTOTYPE.setAttribute);
export const removeAttribute    = bindCallTo(ELEMENT_PROTOTYPE.removeAttribute);
export const insertBefore       = bindCallTo(ELEMENT_PROTOTYPE.insertBefore);
export const removeChild        = bindCallTo(ELEMENT_PROTOTYPE.removeChild);
export const createComment      = _bind(DOCUMENT.createComment, DOCUMENT);
export const createValueGetter  = evalCode => new FUNCTION("$data", `with ($data) {
    if ($data.$data) {
        with ($data.$data) {
            return ${ evalCode };
        }
    } 
    else {
        return ${ evalCode };
    }
}
`);


export function getNodeAttrNames(node){
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