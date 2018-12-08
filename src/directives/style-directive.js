import {
    createValueGetter,
    hasAttribute
}   from "../utils.js"
import Directive        from "./Directive.js"
import {NodeHandler} from "./NodeHandler.js";
import {domSetStyle} from "@purtuga/common/src/domutils/domSetStyle.js"

//============================================
const DIRECTIVE = "_style";

export class StyleDirective extends Directive {
    static NodeHandlerConstructor = class extends NodeHandler {
        update(newValue) {
            domSetStyle(this._node, newValue);
        }
    };

    static has(ele) {
        return hasAttribute(ele, DIRECTIVE) ? DIRECTIVE : "";
    }


    init(attr, attrValue) {
        this._attr              = attr;
        this._tokenValueGetter  = createValueGetter((attrValue || ""), "style");
    }
}

export default StyleDirective;