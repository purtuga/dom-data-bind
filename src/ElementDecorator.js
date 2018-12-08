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
 * @param {Object} [optionsOrClassDescriptor]
 * @param {Array} [optionsOrClassDescriptor.directives]
 *
 * @returns {function(*): *}
 *
 * @example
 *
 * @dataBoundTemplates()
 * class NewElement extends ComponentElement {}
 */
export function dataBoundTemplates(optionsOrClassDescriptor) {
    const opt = optionsOrClassDescriptor;

    function applyDirectiveToClass(classDescriptor) {
        memberToApply.forEach(memberName => {
            classDescriptor.elements.push({
                key: memberName,
                kind: "method",
                placement: "prototype",
                descriptor: Object.getOwnPropertyDescriptor(DomDataBindEleProto, memberName)
            });
        });

        // Add directive list if one was set
        if (opt && opt.directives) {
            classDescriptor.elements.push({
                kind: "field",
                key: "directives",
                placement: "static",
                descriptor: { configurable: true },
                initializer() {
                    return opt.directives;
                }
            });
        }

        return classDescriptor
    }

    // If this is being called with the actual Class decoratorDescriptor,
    // then decorate the class
    if (optionsOrClassDescriptor && optionsOrClassDescriptor.kind) {
        applyDirectiveToClass(optionsOrClassDescriptor);
    }

    return applyDirectiveToClass;
}