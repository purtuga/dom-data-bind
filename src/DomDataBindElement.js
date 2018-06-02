//------------------------------------------------------------------------
//
//  NOTE:   THIS MODULE IS NOT INCLUDED IN A BUILD.
//          TO USE IT, YOU MUST FIRST INSTALL ComponentElement
//          AND THEN IMPORT THIS DIRECTLY FROM SOURCE
//
//------------------------------------------------------------------------
import {ComponentElement, getComponentTemplate} from "component-element"
import {render} from "./render"
import {allDirectives} from "./index";


//==============================================================================

export * from "component-element"
export * from "./index"

/**
 * Base class around ComponentElement that allows for `template` to
 * take advantage of DomDataBind as its templating engine.
 * Subclasses of this base class should define the `_state` instance
 * property to return an object, which is then used in the template.
 *
 * When the template is bound it will passed an object with two properties:
 *
 * -    `props`: the `element.props`
 * -    `state`: the `element._state`
 */
export class DomDataBindElement extends ComponentElement {

    static renderTemplate(ele) {
        const template = render(
            getComponentTemplate(this).innerHTML,
            {
                props: this.props,
                state: ele._state || {}
            },
            allDirectives
        );
        ele.onDestroy(() => template.DomDataBind.destroy());
        return template;
    }

    // called when a new instance of the template is needed
    // static renderTemplate(ele) {}

    // Called from constructor
    // init() {}

    // Called when all required `props` have been provided
    // ready() {}

    // Called if required fields are removed
    // unready() {}

    // called when element is attached to dom
    // mounted() {}

    // called when element is removed from dom
    // unmounted() {}

    //-------------------------------------------------------------
    //
    //                                            INSTANCE MEMBERS
    //
    //-------------------------------------------------------------

    /**
     * Element's private state.
     * @property DomDataBindElement#_state
     * @type {Object}
     */

}

export default DomDataBindElement;
