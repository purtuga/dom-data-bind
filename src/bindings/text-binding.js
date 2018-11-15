import Directive from "../directives/Directive"
import {
    PRIVATE,
    UUID,
    createValueGetter   } from "../utils"

//===========================================================

export class TextBinding extends Directive {
    init(tokenText) {
        this._tokenText = tokenText;
        this._tokenValueGetter = createValueGetter(tokenText, "text");
    }

    render(handler, node, data) {
        super.render(handler, node, data);
        const state = PRIVATE.get(handler);
        if (!state.update) {
            state.update = newValue => {
                if (newValue !== node.nodeValue) {
                    node.nodeValue = newValue;
                }
            };
        }
    }

    /**
     * Returns an object with a `render` function for the given node
     *
     * @param {Node} node
     *
     * @return
     */
    getNodeHandler(node) {
        // Text nodes are processed in a special way in `DomDataBind.getTemplateForDomElement`, where
        // free-floating textnode are replaced with HTML comments in order to not lose their place when
        // converted to text and then back to dom elements. We replace those here now..
        if (node.nodeType === 8 && node.nodeValue === UUID) {
            const nodeToRemove = node;
            // FIXME: below code should use node.ownerDocument???
            node = node.parentNode.insertBefore(document.createTextNode(""), nodeToRemove);
            nodeToRemove.parentNode.removeChild(nodeToRemove);
        }

        return super.getNodeHandler(node);
    }
}

export default TextBinding;

