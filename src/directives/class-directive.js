import domHasClass      from "@purtuga/common/src/domutils/domHasClass.js"
import domAddClass      from "@purtuga/common/src/domutils/domAddClass.js"
import domRemoveClass   from "@purtuga/common/src/domutils/domRemoveClass.js"
import Directive        from "./Directive.js"
import {
    PRIVATE,
    createValueGetter,
    hasAttribute  } from "../utils.js"
import {NodeHandler} from "./NodeHandler.js";

//============================================
const DIRECTIVE = "_class";

export class ClassDirective extends Directive {
    static NodeHandlerConstructor = class ClassDirectiveNodeHandler extends NodeHandler {
        update(newClasses) {
            const { _node: node } = this;
            const oldClasses = PRIVATE.get(this).value || {};

            Object.keys(newClasses)
                .concat(Object.keys(oldClasses))
                .forEach(className => {
                    if (newClasses[className] && !domHasClass(node, className)) {
                        domAddClass(node, className);
                    }
                    else if (!newClasses[className] && domHasClass(node, className)) {
                        domRemoveClass(node, className);
                    }
                });
        }
    };

    static has(ele) {
        return hasAttribute(ele, DIRECTIVE) ? DIRECTIVE : "";
    }

    init(attr, attrValue) {
        this._attr              = attr;
        this._tokenValueGetter  = createValueGetter((attrValue || ""), "class");
    }
}

export default ClassDirective;

