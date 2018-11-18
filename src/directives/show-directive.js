import Directive        from "./Directive"
import {
    createValueGetter,
    hasAttribute    }   from "../utils"
import {NodeHandler} from "./NodeHandler.js";

//============================================
const DIRECTIVE             = "_show";
const HIDDEN                = "none";

export class ShowDirective extends Directive {
    static NodeHandlerConstructor = class extends NodeHandler {
        init(...args) {
            super.init(...args);
            this._origDisplayStyle = this._node.style.display || "";
        }
        update(newValue) {
            const eleStyleList = this._node.style;

            if (newValue) {
                eleStyleList.display = this._origDisplayStyle;
            }
            else if (eleStyleList.display !== HIDDEN)  {
                eleStyleList.display = HIDDEN;
            }
        }
    };

    static has(ele) {
        return hasAttribute(ele, DIRECTIVE) ? DIRECTIVE : "";
    }

    init(attr, attrValue) {
        this._attr              = attr;
        this._tokenValueGetter  = createValueGetter((attrValue || ""), "show");
    }
}

export default ShowDirective;