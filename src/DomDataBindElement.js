//------------------------------------------------------------------------
//
//  NOTE:   THIS MODULE IS NOT INCLUDED IN A BUILD.
//          TO USE IT, YOU MUST FIRST INSTALL ComponentElement
//          AND THEN IMPORT THIS DIRECTLY FROM SOURCE
//
//------------------------------------------------------------------------
import {ComponentElement} from "@purtuga/component-element/src/ComponentElement.js"
import {
    prepareRenderedContent,
    supportsNativeShadowDom,
    reStyleComponentInstanceSubtree
} from "@purtuga/component-element/src/polyfill-support.js"
import {objectExtend} from "@purtuga/common/src/jsutils/objectExtend.js"
import {throwIfThisIsPrototype} from "@purtuga/common/src/jsutils/throwIfThisIsPrototype.js"
import {createElement, defineProperty} from "@purtuga/common/src/jsutils/runtime-aliases.js";
import {generatePropGetterSetter} from "@purtuga/common/src/jsutils/generatePropGetterSetter.js";
import {view} from "./view.js"
import {render} from "./render.js"


//==============================================================================
export * from "@purtuga/component-element"
export * from "./index"

const BINDING = Symbol("dom-data-bind");
const STATE_OBSERVABLE = "__$STATE$";
const SHADOW_DOM_SUPPORTED = supportsNativeShadowDom();

/**
 * Base class around ComponentElement that allows for `template` to
 * take advantage of DomDataBind as its templating engine.
 *
 * Private state data can be assigned to the `this.state` property (an `Object`),
 * which will automatically trigger `render()` to be executed if any of its shallow
 * properties change.
 *
 * Render templates will be given the entire component instance as input (`data`) for
 * rendering, thus the entire component members (like `props` and `state`) will be available
 *
 * @extends ComponentElement
 *
 * @example
 *
 * import {DomDataBindElement} from "@purtuga/dom-data-bind/src/DomDataBindElement.js"
 *
 * export class TestComponent extends DomDataBindElement {
 *      static tagName = "test-component";
 *
 *      didInit() {
 *          this.state = {
 *              title: "test"
 *          };
 *      }
 *
 *      willRender() {
 *          return this._templateDone;
 *      }
 *
 *      render() {
 *          this._templateDone = true; // will cancel future .render()'s
 *         return `<h1>{{state.title}}</h1>`;
 *      }
 * }
 *
 */
export class DomDataBindElement extends ComponentElement {

    /**
     * The list of directives that will be used when rendering the template.
     * By default, no directives are defined
     * @type {Array}
     */
    static directives = [];

    //-------------------------------------------------------------
    //
    //                                            INSTANCE MEMBERS
    //
    //-------------------------------------------------------------

    _setView(renderOutput) {
        // the view template is rendered with `this` as the `data` argument


        // FIXME: needs to handle DOMElements + DocumentFragments?

        const binding = getDomDataBindMeta(this);

        if (!SHADOW_DOM_SUPPORTED) {
            // renderOutput, before being recreated as a View Template, MUST
            // be processed by ShadyCSS - so that the resulting string has scoped DOM.
            // This is needed because DomDataBind will manipulate the html for the
            // template and may actually remove nodes (ex. if, each directives) that
            // are inserted/added dynamically later.
            const scopeTemplate = createElement("template");
            scopeTemplate.innerHTML = renderOutput;
            prepareRenderedContent(scopeTemplate, this);
            renderOutput = scopeTemplate.innerHTML;
        }

        let viewTemplate = view(renderOutput, this.constructor.directives);

        // If it is the same as the template currently displayed - exit; Nothing to do.
        if (binding.current && binding.current.DomDataBind.fromTemplateId === viewTemplate.id) {
            binding.current.DomDataBind.setData(this);
            reStyleComponentInstanceSubtree(this);
            return;
        }

        if (binding.current) {
            binding.current.DomDataBind.destroy();
        }

        // Create a new instance of this template
        binding.current = render(viewTemplate, this, this.constructor.directives);

        this.$ui.textContent = "";
        this.$ui.appendChild(binding.current);

        if (!SHADOW_DOM_SUPPORTED) {
            reStyleComponentInstanceSubtree(this);
        }
    }

    /**
     * Adds the members of a given object ot the state object. Use this when wanting to
     * add additional props to state after it has already been initialized
     *
     * @param {Object} obj
     */
    addToState(obj) {
        return stateSetter.call(this, obj);
    }

    /**
     * Element's private state. Object is an observable structure.
     *
     * @property DomDataBindElement#state
     * @type {Object}
     */
    get state() {
        throwIfThisIsPrototype(this);
        return setupState(this)
    }
    set state(data) {
        throwIfThisIsPrototype(this);
        return setupState(this, data);
    }
}

function getDomDataBindMeta(instance) {
    if (!instance[BINDING]) {
        instance[BINDING] = {
            current: null
        };
    }
    return instance[BINDING];
}

function setupState(instance, data = {}) {
    if (instance._isSettingUp) {
        return;
    }
    instance._isSettingUp = true;
    defineProperty(instance, STATE_OBSERVABLE, data);
    defineProperty(instance, "state", undefined, stateGetter, stateSetter);
    addReactivityToState(instance);
    delete instance._isSettingUp;
    return data;
}

function stateGetter() {
    return this[STATE_OBSERVABLE];
}

function stateSetter(data) {
    objectExtend(true, this[STATE_OBSERVABLE], data);
    addReactivityToState(this);
    return this[STATE_OBSERVABLE];
}

function addReactivityToState(instance) {
    // this === DomDataBindElement!!!!
    Object
        .entries(Object.getOwnPropertyDescriptors(instance[STATE_OBSERVABLE]))
        .forEach(([key, descriptor]) => {
            if (!descriptor.get || !descriptor.get.isGetterSetter) {
                const getterSetter = generatePropGetterSetter(
                    key,
                    undefined,
                    instance[STATE_OBSERVABLE][key],
                    instance._queueUpdate,
                    instance
                );
                defineProperty(instance[STATE_OBSERVABLE], key, undefined, getterSetter, getterSetter, true, true);
            }
        });
}

export default DomDataBindElement;
