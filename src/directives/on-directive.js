import domAddEventListener  from "common-micro-libs/src/domutils/domAddEventListener"
import Directive            from "./Directive"
import {
    PRIVATE,
    escapeString,
    createValueGetter,
    getNodeAttrNames,
    logError } from "../utils"

//============================================
const DIRECTIVE             = "_on.";
const matchesDirective      = new RegExp(`^${ escapeString(DIRECTIVE) }(.*)`);

export class OnDirective extends Directive {
    static has(ele) {
        let directiveAttr = "";
        getNodeAttrNames(ele).some(attr => matchesDirective.test(attr) && (directiveAttr = attr));
        return directiveAttr;
    }


    init(directiveAttr, attrValue) {
        this._attr              = directiveAttr;
        this._eventName         = (new RegExp(matchesDirective)).exec(directiveAttr)[1];
        this._tokenValueGetter  = createValueGetter((attrValue || ""));
    }

    /**
     * Handles the event on the node
     *
     * @param {NodeHandler} handler
     * @param {Event} domEv
     */
    handleEvent(handler, domEv) {
        const state = PRIVATE.get(handler);

        let tokenValue;
        state.data.$ev = domEv;

        try {
            tokenValue = this._tokenValueGetter(state.data);
        }
        catch(e) {
            logError(e);
            return;
        }

        delete state.data.$ev;

        if ("function" === typeof tokenValue) {
            return tokenValue.call(handler._n, domEv);
        }
        // DOM EventHandler interface: object having a `handleEvent` method
        else if (tokenValue && "function" === tokenValue.handleEvent) {
            tokenValue.handleEvent.call(tokenValue, domEv);
        }
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

    getNodeHandler(node) {
        const handler = super.getNodeHandler(node);
        const evListener = domAddEventListener(node, this._eventName, this.handleEvent.bind(this, handler));
        handler.onDestroy(() => evListener.remove());
        return handler;
    }
}

export default OnDirective;
