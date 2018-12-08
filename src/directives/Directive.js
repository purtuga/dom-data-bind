import Compose from "@purtuga/common/src/jsutils/Compose.js"
import {logError, PRIVATE, removeAttribute} from "../utils.js"
import {NodeHandler} from "./NodeHandler.js";

//===================================================================================

// FIXME: replace use of Compose.js

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
     * The Class that will be used to initialize a new node handler for the directive
     *
     * @type NodeHandler
     * @constructor
     */
    static NodeHandlerConstructor = NodeHandler;

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
             * @property {Function} tracker
             * @property {Function} update
             */
            state = {
                data:       null,
                value:      "",
                isQueued:   false,
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

        this.update(handler);
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

            if (handlerState.value !== newValue) {
                handlerState.value = newValue;
            }
        }
    }

    /**
     * Cleans the node by removing Directive specific attribute. By default, the `_attr`
     * that was given to this constructor will be removed from the node.
     *
     * @param {Node} node
     */
    cleanNode(node) {
        if (this._attr && node.nodeType !== 8 /* don't process comment nodes */) {
            removeAttribute(node, this._attr);
        }
    }

    /**
     * Returns a node handler for this Directive on the provided Node
     *
     * @param {Node} node
     * @param {Array<Directive>} [directives]
     *
     * @return {NodeHandler}
     */
    getNodeHandler(node, directives) {
        this.cleanNode(node);
        return new this.constructor.NodeHandlerConstructor(this, node, directives);
    }
}
export default Directive;

