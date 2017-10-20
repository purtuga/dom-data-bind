import domAddEventListener from "common-micro-libs/src/domutils/domAddEventListener"
import Directive           from "./Directive"
import {
    PRIVATE,
    escapeString,
    getAttribute,
    removeAttribute,
    createValueGetter,
    getNodeAttrNames } from "../utils"

//============================================
const DIRECTIVE             = "b:on.";
const matchesDirective      = new RegExp(`^${ escapeString(DIRECTIVE) }(.*)`);

const OnDirective = Directive.extend({
    init(ele, directiveAttr) {
        let dataForTokenValueGetter = {};
        let tokenValueGetter        = createValueGetter(getAttribute(ele, directiveAttr));
        let eventCallback;
        let evListener;
        const eventName         = (new RegExp(matchesDirective)).exec(directiveAttr)[1];
        const updater           = data => {
            if (data) {
                dataForTokenValueGetter = data;
            }

            let newEventCallback;

            try {
                newEventCallback = tokenValueGetter(dataForTokenValueGetter);
            }
            catch(e) {
                console.error(e);
                return;
            }

            if (evListener && newEventCallback === eventCallback) {
                return;
            }

            eventCallback = newEventCallback;

            if (evListener) {
                evListener.remove();
            }

            // FIXME: handle expressions in event token value

            evListener = inst.evListener = domAddEventListener(ele, eventName, eventCallback);
        };
        const inst = { updater };

        PRIVATE.set(this, inst);
        removeAttribute(ele, directiveAttr);

        this.onDestroy(() => {
            this.getFactory().getDestroyCallback(inst, PRIVATE)();
            tokenValueGetter = evListener = null;
        });
    }
});

export default OnDirective;

OnDirective.has = function (ele) {
    let directiveAttr = "";
    getNodeAttrNames(ele).some(attr => matchesDirective.test(attr) && (directiveAttr = attr));
    return directiveAttr;
};
