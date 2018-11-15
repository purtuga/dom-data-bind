import {
    PRIVATE,
    createValueGetter,
    hasAttribute    }   from "../utils"
import Directive        from "./Directive"

//============================================
const DIRECTIVE = "_style";

export class StyleDirective extends Directive {
    static has(ele) {
        return hasAttribute(ele, DIRECTIVE) ? DIRECTIVE : "";
    }


    init(attr, attrValue) {
        this._attr              = attr;
        this._tokenValueGetter  = createValueGetter((attrValue || ""), "style");
    }

    render(handler, node, data) {
        super.render(handler, node, data);
        const state = PRIVATE.get(handler);
        if (!state.update) {
            const eleStyleList  = node.style;
            state.update        = newValue => {
                Object.keys(newValue).forEach(styleProp => {
                    if (eleStyleList[styleProp] !== newValue[styleProp]) {
                        eleStyleList[styleProp] = newValue[styleProp];
                    }
                });
            };
        }
    }
}

export default StyleDirective;