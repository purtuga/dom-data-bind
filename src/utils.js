import dataStore    from "@purtuga/common/src/jsutils/dataStore"
import Map          from "@purtuga/common/src/jsutils/es6-Map"
import {
    functionBindCall,
    isObject,
    arrayForEach,
    hasAttribute,
    setAttribute,
    removeAttribute,
    insertBefore,
    createElement,
    createTextNode,
    createDocFragment,
    consoleError,
    functionBind
} from "@purtuga/common/src/jsutils/runtime-aliases.js"

//=====================================================
const DOCUMENT              = document;
const FUNCTION              = Function;
const ELEMENT_PROTOTYPE     = Element.prototype;
const ARRAY_PROTOTYPE       = Array.prototype;
const VALUE_GETTERS         = new Map();
let counter = 1;

export {
    arrayForEach,
    hasAttribute,
    setAttribute,
    removeAttribute,
    insertBefore,
    createElement,
    createTextNode,
    createDocFragment
};

export const DOM_DATA_BIND_PROP = "DomDataBind";
export const PRIVATE            = dataStore.create();
export const UUID               = `D-${ Date.now() }-${ Math.random().toString(36).replace(/[^a-z0-9]+/g, '') }`;
export const escapeString       = str => String(str).replace(/[-[\]/{}()*+?.\\^$|]/g, "\\$&");
export const bindCallTo         = functionBindCall;
export const isPureObject       = isObject;
export const isString           = s => "string" === typeof s;// FIXME: replace with common-micro-libs runtime-aliases
export const arraySlice         = functionBindCall(ARRAY_PROTOTYPE.slice);// FIXME: replace with common-micro-libs runtime-aliases
export const getAttribute       = functionBindCall(ELEMENT_PROTOTYPE.getAttribute);// FIXME: replace with common-micro-libs runtime-aliases
export const removeChild        = functionBindCall(ELEMENT_PROTOTYPE.removeChild);// FIXME: replace with common-micro-libs runtime-aliases
export const createComment      = functionBind(DOCUMENT.createComment, DOCUMENT);// FIXME: replace with common-micro-libs runtime-aliases
export const isTemplate         = e => Object.prototype.toString.call(e) === "[object HTMLTemplateElement]"; // FIXME: replace with common-micro-libs runtime-aliases
export const logError           = consoleError;


/**
 * Create a Function to be used in retrieving a given value from a data structure
 * @param evalCode
 * @param name
 * @returns {*}
 */
export function createValueGetter(evalCode, name = "runtime") {
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
//# sourceURL=valueGetter:${name}.${counter++}.js`);

    VALUE_GETTERS.set(evalCode, fn);
    return fn;
}

/**
 * Returns an array of attributes names found on a given HTML node
 *
 * @param {HTMLElement} node
 * @returns {Array}
 */
export function getNodeAttrNames(node){
    const attrNames = [];
    const total = node.attributes.length;

    for(let i = 0; i < total; i++) {
        attrNames.push(node.attributes.item(i).name);
    }

    return attrNames;
}