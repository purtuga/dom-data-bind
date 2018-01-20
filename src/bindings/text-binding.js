import nextTick     from "common-micro-libs/src/jsutils/nextTick"
import Directive    from "../directives/Directive"
import {
    setDependencyTracker,
    unsetDependencyTracker,
    stopDependeeNotifications   } from "observable-data/src/ObservableObject"

import {
    PRIVATE,
    UUID,
    createValueGetter,
    logError    } from "../utils"

//===========================================================

export class TextBinding extends Directive {
    init(tokenText) {
        this._tokenText = tokenText;
        this._tokenValueGetter = createValueGetter(tokenText);
    }

    render(handler, node, data) {
        let state = PRIVATE.get(node);

        if (!state) {
            state = {
                data: null,
                isQueued:   false,
                tracker:    () => this.render(handler, node, state.data),
                update:     () => {
                    setDependencyTracker(state.tracker);

                    try {
                        node.nodeValue = this._tokenValueGetter(state.data || {});
                    }
                    catch(e) {
                        logError(e);
                    }

                    unsetDependencyTracker(state.tracker);
                    state.isQueued = false;
                }
            };
            PRIVATE.set(node, state);
        }

        stopDependeeNotifications(state.tracker);
        state.data = data;

        if (state.isQueued) {
            return;
        }

        state.isQueued = true;
        nextTick(state.update);
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
            node = node.parentNode.insertBefore(document.createTextNode(this._tokenText), nodeToRemove);
            nodeToRemove.parentNode.removeChild(nodeToRemove);
        }

        return super.getNodeHandler(node);
    }
}

export default TextBinding;

