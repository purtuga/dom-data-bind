import dataStore    from "common-micro-libs/src/jsutils/dataStore"

//=====================================================
const DOCUMENT              = document;
const FUNCTION              = Function;
const ELEMENT_PROTOTYPE     = Element.prototype;

const _bind = FUNCTION.bind.call.bind(FUNCTION.bind);

export const PRIVATE = dataStore.create();

export const escapeString       = str => String(str).replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
export const bindCallTo         = _bind(FUNCTION.call.bind, FUNCTION.call);
export const getAttribute       = bindCallTo(ELEMENT_PROTOTYPE.getAttribute);
export const setAttribute       = bindCallTo(ELEMENT_PROTOTYPE.setAttribute);
export const removeAttribute    = bindCallTo(ELEMENT_PROTOTYPE.removeAttribute);
export const insertBefore       = bindCallTo(ELEMENT_PROTOTYPE.insertBefore);
export const removeChild        = bindCallTo(ELEMENT_PROTOTYPE.removeChild);
export const createComment      = _bind(DOCUMENT.createComment, DOCUMENT);
export const createValueGetter  = evalCode => new FUNCTION("d", `with (d) {return ${ evalCode };}`)
