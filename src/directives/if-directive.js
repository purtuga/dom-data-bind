import Directive    from "./Directive"
import {
    PRIVATE,
    hasAttribute,
    createComment,
    insertBefore,
    removeChild,
    createValueGetter,
    createDocFragment   } from "../utils"

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
            state.cloneBinder = null;
            state.update = showElement => {
                if (state.value === showElement) {
                    return;
                }

                if (showElement && !state.cloneBinder) {
                    const frag = createDocFragment();
                    const clonedEle = node.cloneNode(true);

                    frag.appendChild(clonedEle);
                    state.cloneBinder = new handler._Factory(clonedEle, showElement);
                    insertBefore(handler._placeholderEle.parentNode, frag, handler._placeholderEle);
                    state.cloneBinder.onDestroy(() => {
                        // We do this check because a directive could have
                        // removed the element from its parent.
                        if (clonedEle.parentNode) {
                            removeChild(clonedEle.parentNode, clonedEle);
                        }
                    });
                }
                else if (!showElement && state.cloneBinder)  {
                    state.cloneBinder.destroy();
                    state.cloneBinder = null;
                }
            };
            handler.onDestroy(() => {
                if (state.cloneBinder) {
                    state.cloneBinder.destroy();
                    state.cloneBinder = null;
                }
            });
        }
    }

    getNodeHandler(node, binder) {
        const handler           = super.getNodeHandler(node);
        handler._Factory        = binder.getFactory();
        handler._placeholderEle = createComment("");
        insertBefore(node.parentNode, handler._placeholderEle, node);
        removeChild(node.parentNode, node);
        return handler;
    }
}

export default IfDirective;

IfDirective.__new = true; // FIXME: remove this
