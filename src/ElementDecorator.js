import {DomDataBindElement} from "./DomDataBindElement.js";

//======================================================================
const DomDataBindEleProto = DomDataBindElement.prototype;
const memberToApply = [
    "_setView",
    "addToState",
    "state"
];

/**
 * Decorates a sub-class of `@purtuga/ComponentElement` so that rendered content
 * uses data binding. (essentially, copies the methods from `DomDataBindElement`
 * to the given class.
 *
 * @returns {function(*): *}
 *
 * @example
 *
 * @dataBoundTemplates()
 * class NewElement extends ComponentElement {}
 */
export function dataBoundTemplates (/*options*/) {

    return function (classDescriptor) {
        memberToApply.forEach(memberName => {
            classDescriptor.elements.push({
                key: memberName,
                kind: "method",
                placement: "prototype",
                descriptor: Object.getOwnPropertyDescriptor(DomDataBindEleProto, memberName)
            });
        });

        return classDescriptor
    };
}