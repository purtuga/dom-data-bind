import Directive    from "./Directive"
import {
    PRIVATE,
    DOM_DATA_BIND_PROP,
    arraySlice,
    hasAttribute,
    createComment,
    insertBefore,
    removeChild,
    createValueGetter } from "../utils"
import {render} from "../render"

//============================================
const DIRECTIVE = "_if";

export class IfDirective extends Directive {
    static has(ele) {
        return hasAttribute(ele, DIRECTIVE) ? DIRECTIVE : "";
    }

    static manages() { return true; }

    init(attr, attrValue) {
        this._attr              = attr;
        this._tokenValueGetter  = createValueGetter((attrValue || ""));
    }

    render(handler, node, data) {
        super.render(handler, node, data);
        const state = PRIVATE.get(handler);

        if (!state.update) {
            state.renderedEle           = null;
            state.insertEle             = handler._placeholderEle;
            state.directives            = handler._directives;
            state.destroyRenderedEle    = destroyRenderedEle;
            state.renderTemplate        = handler._n.data;
            state.update                = renderUpdate;
            handler.onDestroy(() => state.destroyRenderedEle());
        }
    }

    getNodeHandler(node, directives) {
        const handler = super.getNodeHandler(node);
        handler._placeholderEle = createComment("");
        handler._directives = directives;
        insertBefore(node.parentNode, handler._placeholderEle, node);
        removeChild(node.parentNode, node);
        return handler;
    }
}

function renderUpdate(showElement) {
    // this === state object
    if (this.value === showElement) {
        return;
    }

    if (showElement && !this.renderedEle) {
        this.renderedEle = render(this.renderTemplate, this.data, this.directives);
        this.renderedEle._children = arraySlice(this.renderedEle.childNodes, 0);
        insertBefore(this.insertEle.parentNode, this.renderedEle, this.insertEle);
    }
    else if (!showElement && this.renderedEle)  {
        this.destroyRenderedEle();
    }
}

function destroyRenderedEle() {
    // this === state object
    if (this.renderedEle) {
        this.renderedEle._children.forEach(e => e.parentNode && e.parentNode.removeChild(e));
        this.renderedEle[DOM_DATA_BIND_PROP].destroy();
        this.renderedEle = null;
    }
}

export default IfDirective;
