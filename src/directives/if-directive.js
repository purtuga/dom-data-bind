import Directive    from "./Directive"
import {
    PRIVATE,
    DOM_DATA_BIND_PROP,
    hasAttribute,
    createComment,
    removeChild,
    createValueGetter } from "../utils"
import {render} from "../render"
import {NodeHandler} from "./NodeHandler.js";
import {domInsertBefore} from "@purtuga/common/src/domutils/domInsertBefore.js"

//============================================
const DIRECTIVE = "_if";

export class IfDirective extends Directive {
    static NodeHandlerConstructor = class extends NodeHandler {

        _renderedEle = null;

        _renderTemplate = this._node.data;

        init(...args) {
            super.init(...args);
            this._placeholderEle = createComment("directive.if");
            domInsertBefore(this._placeholderEle, this._node);
            removeChild(this._node.parentNode, this._node);
        }
        update(showElement) {
            const state = PRIVATE.get(this);

            // If there is no change in Element visibility, then only update its data.
            if (state.value === showElement) {
                if (this._renderedEle) {
                    this._renderedEle[DOM_DATA_BIND_PROP].setData(state.data);
                }
                return;
            }

            if (showElement && !this._renderedEle) {
                this._renderedEle = render(this._renderTemplate, state.data, this._directives);
                domInsertBefore(this._renderedEle, this._placeholderEle);
            } else if (!showElement)  {
                this.destroy_renderedEle();
            }
        }

        destroy_renderedEle() {
            if (this._renderedEle) {
                this._renderedEle[DOM_DATA_BIND_PROP].recover();
                this._renderedEle[DOM_DATA_BIND_PROP].destroy();
                this._renderedEle = null;
            }
        }
    };

    static has(ele) {
        return hasAttribute(ele, DIRECTIVE) ? DIRECTIVE : "";
    }

    static manages() { return true; }

    init(attr, attrValue) {
        this._attr              = attr;
        this._tokenValueGetter  = createValueGetter((attrValue || ""), "if");
    }
}

export default IfDirective;
