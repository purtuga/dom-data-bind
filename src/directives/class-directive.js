import domHasClass      from "common-micro-libs/src/domutils/domHasClass"
import domAddClass      from "common-micro-libs/src/domutils/domAddClass"
import domRemoveClass   from "common-micro-libs/src/domutils/domRemoveClass"
import Directive        from "./Directive"
import {
    PRIVATE,
    createValueGetter,
    hasAttribute  } from "../utils"

//============================================
const DIRECTIVE = "_class";

export class ClassDirective extends Directive {
    static has(ele) {
        return hasAttribute(ele, DIRECTIVE) ? DIRECTIVE : "";
    }


    init(attr, attrValue) {
        this._attr              = attr;
        this._tokenValueGetter  = createValueGetter((attrValue || ""));
    }

    render(handler, node, data) {
        super.render(handler, node, data);
        const state = PRIVATE.get(handler);
        if (!state.update) {
            state.update = newValue => applyCssClassesToNode(node, newValue, newValue !== state.value ? state.value : {});
        }
    }
}

export default ClassDirective;


function applyCssClassesToNode(node, newClasses = {}, oldClasses = {}) {
    Object.keys(newClasses)
        .concat(Object.keys(oldClasses))
        .forEach(className => {
            if (newClasses[className] && !domHasClass(node, className)) {
                domAddClass(node, className);
            }
            else if (domHasClass(node, className)) {
                domRemoveClass(node, className);
            }
        });
}



ClassDirective.__new = true; // FIXME: remove this

