//------------------------------------------------------------------------
//
//  NOTE:   THIS MODULE IS NOT INCLUDED IN A BUILD.
//          TO USE IT, YOU MUST FIRST INSTALL ComponentElement
//          AND THEN IMPORT THIS DIRECTLY FROM SOURCE
//
//------------------------------------------------------------------------
import {ComponentElement, getComponentTemplate} from "component-element"
import {objectExtend} from "@purtuga/common/src/jsutils/objectExtend"
import {render} from "./render"
import {allDirectives} from "./index";
import {makeObservable} from "@purtuga/observables"


//==============================================================================

export * from "component-element"
export * from "./index"


const STATE_OBSERVABLE = "__$STATE$";

/**
 * Base class around ComponentElement that allows for `template` to
 * take advantage of DomDataBind as its templating engine.
 * Subclasses of this base class should define the `state` instance
 * property to an object during the `init` lifecycle hook.
 *
 * When the template is bound it will passed an object with two properties:
 *
 * -    `props`: the `element.props`
 * -    `state`: the `element._state`
 *
 * @extends ComponentElement
 */
export class DomDataBindElement extends ComponentElement {

    static renderTemplate(eleInstance) {
        const template = render(
            getComponentTemplate(this).innerHTML,
            {
                props: eleInstance.props,
                state: eleInstance.state
            },
            allDirectives
        );
        eleInstance.onDestroy(() => template.DomDataBind.destroy());
        return template;
    }

    //-------------------------------------------------------------
    //
    //                                            INSTANCE MEMBERS
    //
    //-------------------------------------------------------------

    /**
     * Element's private state. Object is an observable structure.
     *
     * @property DomDataBindElement#state
     * @type {Object}
     */
    get state() {
        throwIfPrototype(this);
        return setupState(this)
    }
    set state(data) {
        throwIfPrototype(this);
        return setupState(this, data);
    }
}

function throwIfPrototype(instance) {
    if (instance.constructor.prototype === instance) {
        throw new Error("Use on prototype not allowed");
    }
}

function setupState(instance, data = {}) {
    if (instance._isSettingUp) {
        return;
    }
    instance._isSettingUp = true;
    Object.defineProperty(instance, STATE_OBSERVABLE, {
        value: makeObservable(data)
    });
    Object.defineProperty(instance, "state", {
        configurable: true,
        get: stateGetter,
        set: stateSetter
    });
    delete instance._isSettingUp;
    return data;
}

function stateGetter() {
    return this[STATE_OBSERVABLE];
}

function stateSetter(data) {
    objectExtend(true, this[STATE_OBSERVABLE], data);
    makeObservable(this[STATE_OBSERVABLE], true, true);
    return this[STATE_OBSERVABLE];
}

export default DomDataBindElement;
