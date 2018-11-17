import nextTick from "@purtuga/common/src/jsutils/nextTick"
import Compose from "@purtuga/common/src/jsutils/Compose"
import {logError, PRIVATE, removeAttribute} from "../utils"
// import {setDependencyTracker, unsetDependencyTracker} from "@purtuga/observables/src/objectWatchProp"

//===================================================================================

/**
 * A DOM element directive.
 * NOte that any directive that removes the original DOM element from its parent
 * will prevent all subsequent directives from running.
 *
 * @class Directive
 * @extends Compose
 *
 * @param {String} directiveAttr
 *  The directive html element attribute as found in the element.
 * @param {String} attrValue
 *  The value of the attribute
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
            /**
             * Directive Node Handler state
             *
             * @typedef {Object} NodeHandlerState
             *
             * @property {*} data
             * @property {*} value
             * @property {Boolean} isQueued
             * @property {Function} deferUpd
             * @property {Function} tracker
             * @property {Function} update
             */
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
            // With use of observables, the tracker function get a `stopWatchingAll()` method
            // which removes this tracker from all property dependency lists.
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
        // destruction happens 1ms after .destroy() (Componse#destroy()) is called,
        // so its possible that a handler might come in here having its `.isDestroyed`
        // flag set.
        if (handler.isDestroyed) {
            return;
        }

        const handlerState = PRIVATE.get(handler);

        if (handlerState) {
            let newValue = "";

            // setDependencyTracker(handlerState.tracker); // FIXME: cleanup

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

            // unsetDependencyTracker(handlerState.tracker); // FIXME: cleanup

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
     * @param {Array<Directive>} [directives]
     *
     * @return {NodeHandler}
     */
    getNodeHandler(node/*, directives*/) {
        if (this._attr && node.nodeType !== 8 /* don't process comment nodes */) {
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

