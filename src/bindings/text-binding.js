import Directive from "../directives/Directive"
import {
    UUID,
    createTextNode,
    createValueGetter   } from "../utils"
import {domInsertBefore} from "@purtuga/common/src/domutils/domInsertBefore.js"
import {NodeHandler} from "../directives/NodeHandler.js";

//===========================================================

export class TextBinding extends Directive {
    static NodeHandlerConstructor = class extends NodeHandler {
        update(newValue) {
            if (newValue !== this._node.nodeValue) {
                this._node.nodeValue = newValue;
            }
        }
    };

    init(tokenText) {
        this._tokenText = tokenText;
        this._tokenValueGetter = createValueGetter(tokenText, "text");
    }

    getNodeHandler(node) {
        // Text nodes are processed in a special way in `DomDataBind.getTemplateForDomElement`, where
        // free-floating textnode are replaced with HTML comments in order to not lose their place when
        // converted to text and then back to dom elements. We replace those here now..
        if (node.nodeType === 8 && node.nodeValue === UUID) {
            const nodeToRemove = node;
            node = domInsertBefore(createTextNode(""), nodeToRemove);
            nodeToRemove.parentNode.removeChild(nodeToRemove);
        }

        return super.getNodeHandler(node);
    }
}

export default TextBinding;

