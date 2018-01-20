import Compose                          from "common-micro-libs/src/jsutils/Compose"
import { PRIVATE }                      from "../utils"
import { stopDependeeNotifications }    from "observable-data/src/ObservableObject"


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
     * @param {Node} node
     * @param {Object} data
     */
    render(/*handler, node, data*/) {}

    /**
     * Returns an object with a `render` function for the given node.
     *
     * @param {Node} node
     *
     * @return {NodeHandler}
     */
    getNodeHandler(node) {
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
        this.onDestroy(() => {
            const state = PRIVATE.get(this);
            if (state && state.tracker){
                stopDependeeNotifications(state.tracker);
            }
            if (state.data) {
                state.data = null;
            }
            PRIVATE.delete(this);
        });
    }

    render(data) {
        this._d.render(this, this._n, data);
    }
}

