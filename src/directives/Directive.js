import nextTick         from "common-micro-libs/src/jsutils/nextTick"
import Compose          from "common-micro-libs/src/jsutils/Compose"
import {
    PRIVATE,
    removeAttribute,
    logError    }       from "../utils"
import {
    setDependencyTracker,
    unsetDependencyTracker
} from "observables"

//===================================================================================

/**
 * A DOM element directive.
 * NOte that any directive that removes the original DOM element from its parent
 * will prevent all subsequent directives from running.
 *
 * @class Directive
 * @extends Compose
 *
 * @param {HTMLElement} ele
 *  The HTML element that contains the directive
 * @param {String} directiveAttr
 *  The directive html element attribute as found in the element.
 * @param {String} attrValue
 *  The value of the attribute
 * @param {DomDataBind} binder
 *  The instance of DomDataBind that called the Directive
 */
export class Directive extends Compose {
    /**
     * Checks a given element has an element attribute that matches the Directive.
     * If a match is found, the html Element's attribute that was matched must be
     * returned.
     *
     * @param {HTMLElement} ele
     *
     * @returns {String}
     */
    static has(/*ele*/) { return ""; }

    /**
     * A boolean indicating whether this directive manages the element. If set to true, then
     * `DomDataBind` will not process any other directives after this one.
     */
    static manages() { return false; }

    /**
     * Render the Directive with given data
     *
     * @param {NodeHandler} handler
     * @param {Node} node
     * @param {Object} data
     */
    render(handler, node, data) {
        let state = PRIVATE.get(handler);

        if (!state) {
            state = {
                data:       null,
                value:      "",
                isQueued:   false,
                deferUpd:   this.update.bind(this, handler),
                tracker:    () => this.render(handler, node, state.data)
                //update: () => {} --- should be defined by Directive subclass
            };
            PRIVATE.set(handler, state);

        }

        if (state.data !== data) {
            if (state.tracker.stopWatchingAll) {
                state.tracker.stopWatchingAll();
            }
            state.data = data;
        }

        if (state.isQueued) {
            return;
        }

        state.isQueued = true;
        nextTick(state.deferUpd);
    }

    /**
     * Updates a node by generating a new value for the Directive, storing it
     * in the handler `state.value` and calling `handle.update` after it.
     *
     * @param {NodeHandler} handler
     */
    update(handler) {
        const handlerState = PRIVATE.get(handler);

        if (handlerState) {
            let newValue = "";

            setDependencyTracker(handlerState.tracker);

            try {
                newValue = this._tokenValueGetter(handlerState.data || {});

                // Update node
                if (handler.update) {
                    handler.update(newValue);
                }
            }
            catch(e) {
                logError(e);
            }

            unsetDependencyTracker(handlerState.tracker);

            handlerState.isQueued = false;
            if (handlerState.value !== newValue) {
                handlerState.value = newValue;
            }
        }
    }

    /**
     * Returns an object with a `render` function for the given node.
     *
     * @param {Node} node
     * @param {DomDataBind} [binder]
     *
     * @return {NodeHandler}
     */
    getNodeHandler(node/*, binder*/) {
        if (this._attr) {
            removeAttribute(node, this._attr);
        }
        return new NodeHandler(this, node);
    }
}
export default Directive;

/**
 * A node directive handler.
 *
 * @extends Compose
 */
class NodeHandler extends Compose {
    init(directive, node) {
        this._d = directive;
        this._n = node;
    }

    // Override destroy (which is by default "async" and ensure that notifications
    // are turned off immediately for this Node
    destroy() {
        const state = PRIVATE.get(this);
        if (state){
            if (state.tracker && state.tracker.stopWatchingAll) {
                state.tracker.stopWatchingAll();
            }
            if (state.data) {
                state.data = null;
            }
        }
        super.destroy();
        PRIVATE.delete(this);
    }

    /**
     * Renders the data given on input to the Node
     *
     * @param data
     */
    render(data) {
        this._d.render(this, this._n, data);
    }

    /**
     * Applies a new value to the Node. This method will check if the handler instance state data has
     * a method named `update` and if so, delegate to that method as to how the node should be updated.
     *
     * @param newValue
     */
    update(newValue) {
        const state = PRIVATE.get(this);
        if (state && state.update) {
            return state.update(newValue);
        }
    }
}

