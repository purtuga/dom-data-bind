import Directive        from "./Directive"
import {
    PRIVATE,
    createValueGetter,
    hasAttribute    }   from "../utils"

//============================================
const DIRECTIVE             = "_show";
const HIDDEN                = "none";

export class ShowDirective extends Directive {
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
            const eleStyleList      = node.style;
            const eleDisplayStyle   = node.display || "";
            state.update            = newValue => {
                if (newValue) {
                    eleStyleList.display = eleDisplayStyle;
                }
                else if (eleStyleList.display !== HIDDEN)  {
                    eleStyleList.display = HIDDEN;
                }
            };
        }
    }
}

export default ShowDirective;

ShowDirective.__new = true; // FIXME: remove this.