import Compose from "common-micro-libs/src/jsutils/Compose"
import {makeObservable} from "observables/src/objectWatchProp";
import { PRIVATE, arrayForEach, isString } from "./utils"
import { getBindingFor, applyBindingsToTemplateInstance } from "./Template"
import { render } from "./render";

//======================================================================

/**
 * Bind data to a DOM element and automatically persist changes in that data to the UI.
 * By default, this constructor provides interpolation of Text tokens found in the DOM
 * structure (represented with double curly braces: `{{ }}`). Directives can be used
 * by extending this constructor and adding them to the [directives]{@link DomDataBind.directives}
 * static property.
 *
 * @class DomDataBind
 * @extends Compose
 *
 * @param {String |HTMLElement} html
 *  The HTML element that will be parse and to which `data` will be bound.
 *
 * @param {Object} data
 *  An object whose data will be used to bind to `html` element (once crated) .
 *
 */
export const DomDataBind = Compose.extend({
    /**
     * The Element whose data was bound to.
     * When a string is used on input, this will be a DocumentFragment, which
     * means that it could be empty if its content was inserted into DOM
     */
    $ele: null,

    init(html, data) {
        const Factory = this.getFactory();
        const state = {
            html,
            data,
            directives: Factory.directives.slice(0)
        };

        PRIVATE.set(this, state);

        if (isString(html)) {
            this.$ele = render(html, data, state.directives);
            state.bindings = this.$ele._domDataBindNodeHandlers;
        } else {
            this.$ele = html;
            state.bindings = applyBindingsToTemplateInstance(html, getBindingFor(html, state.directives), state.directives);
            if (data) {
                this.setData(data);
            }
        }

        this.onDestroy(() => {
            arrayForEach(state.bindings, binding => binding.destroy());

            delete state.data;
            delete state.directives;
            delete state.bindings;

            Factory.getDestroyCallback(state, PRIVATE)();
        });
    },

    /**
     * Set data on to the DOM provided during initialization.
     * In most cases, you should never have the need to call this method. Data
     * provided during initialization is "live" and changes are automatically
     * reflected to dom.
     */
    setData(data) {
        makeObservable(data);
        const bindings = PRIVATE.get(this).bindings;
        arrayForEach(bindings, binding => binding.render(data));
    }
});
export default DomDataBind;

/**
 * A list of Directives to be used.
 *
 * @name DomDataBind.directives
 * @type {Array}
 */
DomDataBind.directives = [];
