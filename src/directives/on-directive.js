import domAddEventListener  from "@purtuga/common/src/domutils/domAddEventListener.js"
import Directive            from "./Directive.js"
import {
    PRIVATE,
    escapeString,
    createValueGetter,
    getNodeAttrNames,
    logError,
    parseDirectiveString
} from "../utils.js"
import {NodeHandler} from "./NodeHandler.js";
import {objectKeys} from "@purtuga/common/src/jsutils/runtime-aliases.js";


//============================================
const DIRECTIVE             = "_on.";
const matchesDirective      = new RegExp(`^${ escapeString(DIRECTIVE) }(.*)`);
const isNumber = /^\d+$/;
const keyAliases = {
    "13": "enter",
    "27": "esc",
    "9":  "tab",
    "46": "delete",
    "32": "space",
    "38": "up",
    "40": "down",
    "37": "left",
    "39": "right"
};
const keyCodesAliases = Object.values(keyAliases);

class OnDirectiveNodeHandler extends NodeHandler {

    init(...args) {
        super.init(...args);
        this.setup();
    }

    handleEvent(domEv) {
        const {hasModifiers, modifiers} = this._directive._info;
        const whichKey = domEv.which;

        // If this is a Keyboard event and the directive has modifiers that filters
        // out the type of events to which the callback should be invoked, then
        // only proceed if they match
        if (
            this._directive._filter &&
            domEv instanceof KeyboardEvent &&
            !modifiers[whichKey] &&
            !modifiers[keyAliases[whichKey]]
        ) {
            return;
        }

        const state = PRIVATE.get(this);

        let tokenValue;
        let returnValue;
        state.data.$ev = domEv;

        // The call to the token value getter is done with the context of the HTML Node.
        try {
            tokenValue = this._directive._tokenValueGetter.call(this._node, state.data);
        }
        catch(e) {
            logError(e);
            return;
        }

        delete state.data.$ev;

        if ("function" === typeof tokenValue) {
            returnValue = tokenValue.call(this._node, domEv);
        }
        else if (tokenValue && "function" === tokenValue.handleEvent) {
            // DOM EventHandler interface: object having a `handleEvent` method
            returnValue = tokenValue.handleEvent(domEv);
        }

        // Handle post callback modifiers
        if (hasModifiers) {
            if (modifiers.once) {
                this.teardown();
            }
            if (modifiers.stop) {
                domEv.stopPropagation();
            }
            if (modifiers.prevent) {
                domEv.preventDefault();
            }
        }

        return returnValue;
    }

    setup() {
        this._evListener = domAddEventListener(
            this._node,
            this._directive._eventName,
            this
        );
    }

    teardown() {
        if (this._evListener) {
            this._evListener.remove();
            this._evListener = null;
        }
    }

    destroy() {
        this.teardown();
        super.destroy();
    }
}

export class OnDirective extends Directive {
    static NodeHandlerConstructor = OnDirectiveNodeHandler;

    static has(ele) {
        let directiveAttr = "";
        getNodeAttrNames(ele).some(attr => matchesDirective.test(attr) && (directiveAttr = attr));
        return directiveAttr;
    }

    init(directiveAttr, attrValue) {
        this._attr              = directiveAttr;
        this._info              = parseDirectiveString((new RegExp(matchesDirective)).exec(directiveAttr)[1]);
        this._eventName         = this._info.value;
        this._tokenValueGetter  = createValueGetter((attrValue || ""), "on");

        // Set the flag that indicates there are Events should be filtered
        const modifiers = this._info.modifiers;
        this._filter = objectKeys(modifiers).some(modifier => (
            keyCodesAliases.indexOf(modifier) !== -1 || isNumber.test(modifier)
        ));
    }

    // takes care of only storing the data on the node, for when the event is triggered
    render(handler, node, data) {
        let state = PRIVATE.get(handler);

        if (!state) {
            state = {
                data:       { $data: {} },
                tracker:    () => this.render(handler, node, state.data)
            };
            PRIVATE.set(handler, state);
        }

        if (data) {
            if (data.$data) {
                state.data = data;
            }
            else {
                state.data.$data = data;
            }
        }
    }
}

export default OnDirective;
