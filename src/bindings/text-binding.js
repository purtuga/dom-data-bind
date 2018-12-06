import Directive from "../directives/Directive"
import {
    UUID,
    createTextNode,
    createValueGetter,
    createComment,
    arraySlice
} from "../utils"
import {
    isUndefined,
    isNull,
    isDocFragment
} from "@purtuga/common/src/jsutils/runtime-aliases.js"
import {domInsertBefore} from "@purtuga/common/src/domutils/domInsertBefore.js"
import {domRemoveChild} from "@purtuga/common/src/domutils/domRemoveChild.js"
import {NodeHandler} from "../directives/NodeHandler.js";

//===========================================================
const ID = "text.binding";
const isAttached = node => !!node.parentNode;

// FIXME: handle `newValue` being a ViewTemplate. In this case, we render() that template and store the result. On subsquent updates, if result is teh same, only update its value

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
            this._node = domInsertBefore(createTextNode(""), this._placeholderEle);
            domRemoveChild(this._placeholderEle);
        }

        // If no placeholder element yet, create it now
        if (!this._placeholderEle) {
            this._placeholderEle = createComment(ID);
        }

        this._externalNodes = null; // Array
    }

    update(newValue) {
        // Null and
        if (isNull(newValue) || isUndefined(newValue)) {
            this.clear();
            this.setPlaceholder();
            return;
        }

        // A regular HTML node(s)
        if (newValue instanceof Node) {
            // Is it already displayed here? - then do nothing
            if (this.isCurrentExternal(newValue)) {
                return;
            }

            this.clear();
            this.setPlaceholder();
            this.storeExternals(newValue);
            domInsertBefore(newValue, this._placeholderEle);
            return;
        }

        // ElSE, handle text content (or something can be stringified (toString))
        if (!isAttached(this._node)) {
            this.clear();
            domInsertBefore(this._node, this._placeholderEle);
            domRemoveChild(this._placeholderEle);
        }
        if (newValue !== this._node.nodeValue) {
            this._node.nodeValue = newValue;
        }
    }

    storeExternals(nodeEle) {
        if (this._externalNodes) {
            this.removeExternals();
        }
        this._externalNodes = isDocFragment(nodeEle) ? arraySlice(nodeEle.childNodes, 0) : [ nodeEle ];
    }

    removeExternals() {
        if (this._externalNodes) {
            for (let i = 0, t = this._externalNodes.length; i < t; i++) {
                domRemoveChild(this._externalNodes[i]);
            }
            this._externalNodes = null;
        }
    }

    isCurrentExternal(nodeEle) {
        return this._externalNodes &&
            (
                (
                    !isDocFragment(nodeEle) &&
                    this._externalNodes.length === 1 &&
                    this._externalNodes[0] === nodeEle
                ) ||
                arraySlice(nodeEle).every((newNodeEle, i) => newNodeEle === this._externalNodes[i])
            );
    }

    clear() {
        this.removeExternals();
        this._node.nodeValue = "";
    }

    setPlaceholder() {
        if (!isAttached(this._placeholderEle)) {
            domInsertBefore(this._placeholderEle, this._node);
            domRemoveChild(this._node);
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

