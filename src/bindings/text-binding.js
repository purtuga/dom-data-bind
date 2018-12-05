import Directive from "../directives/Directive"
import {
    UUID,
    createTextNode,
    createValueGetter,
    createComment
} from "../utils"
import {
    isUndefined,
    isNull
} from "@purtuga/common/src/jsutils/runtime-aliases.js"
import {domInsertBefore} from "@purtuga/common/src/domutils/domInsertBefore.js"
import {domRemoveChild} from "@purtuga/common/src/domutils/domRemoveChild.js"
import {NodeHandler} from "../directives/NodeHandler.js";

//===========================================================
const ID = "text.binding";

// FIXME: handle `newValue` being a ViewTemplate. In this case, we render() that template and store the result. On subsquent updates, if result is teh same, only update its value
// FIXME: handle `newValue` being an HTMLElement (just insert to DOM) - Keep track of the nodes inserted so they can be remove on subsquent updates

class TextBindingNodeHandler extends NodeHandler {
    init(...args) {
        super.init(...args);

        let node = this._node;

        // Text nodes are processed in a special way in `DomDataBind.getTemplateForDomElement`, where
        // free-floating textnode are replaced with HTML comments in order to not lose their place when
        // converted to text and then back to dom elements.
        // If that is the case here, then use that HTMLComment as a placeholder
        // and create a "real" textNode for the content
        if (node.nodeType === 8 && node.nodeValue === UUID) {
            this._placeholderEle = node;
            this._placeholderEle.data = ID;
            this._node = node =  domInsertBefore(createTextNode(""), this._placeholderEle);
            domRemoveChild(this._placeholderEle);
        }

        // If no placeholder element yet, create it now
        if (!this._placeholderEle) {
            this._placeholderEle = createComment(ID);
        }
    }

    update(newValue) {
        if (newValue !== this._node.nodeValue) {
            // If null or undefined, then remove text node and replace it
            // with placeholder element
            if (isNull(newValue) || isUndefined(newValue)) {
                this._node.nodeValue = "";
                domInsertBefore(this._placeholderEle, this._node);
                domRemoveChild(this._node);
            } else {
                this._node.nodeValue = newValue;

                // If not attached, then insert it now and remove placeholder
                if (!this._node.parentNode) {
                    domInsertBefore(this._node, this._placeholderEle);
                    domRemoveChild(this._placeholderEle);
                }
            }
        }
    }
}

export class TextBinding extends Directive {
    static NodeHandlerConstructor = TextBindingNodeHandler;

    init(tokenText) {
        this._tokenText = tokenText;
        this._tokenValueGetter = createValueGetter(tokenText, ID);
    }
}

export default TextBinding;

