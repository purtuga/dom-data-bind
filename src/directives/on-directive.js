import domAddEventListener  from "common-micro-libs/src/domutils/domAddEventListener"
import Directive            from "./Directive"
import {
    PRIVATE,
    escapeString,
    removeAttribute,
    createValueGetter,
    getNodeAttrNames } from "../utils"

//============================================
const DIRECTIVE             = "_on.";
const matchesDirective      = new RegExp(`^${ escapeString(DIRECTIVE) }(.*)`);

const OnDirective = Directive.extend({
    init(ele, directiveAttr, attrValue) {
        let dataForTokenValueGetter = { $data: {} };
        let tokenValueGetter        = createValueGetter((attrValue || ""));
        const eventName         = (new RegExp(matchesDirective)).exec(directiveAttr)[1];
        const eventHandler      = domEv => {
            let tokenValue;
            dataForTokenValueGetter.$ev = domEv;

            try {
                tokenValue = tokenValueGetter(dataForTokenValueGetter);
            }
            catch(e) {
                console.error(e);
                return;
            }

            delete dataForTokenValueGetter.$ev;

            if ("function" === typeof tokenValue) {
                tokenValue(domEv);
            }
        };
        const updater = data => {
            if (this.isDestroyed) {
                return;
            }
            if (data) {
                if (data.$data) {
                    dataForTokenValueGetter = data;
                }
                else {
                    dataForTokenValueGetter.$data = data;
                }
            }
        };
        const inst = { updater };

        PRIVATE.set(this, inst);
        removeAttribute(ele, directiveAttr);
        inst.evListener = domAddEventListener(ele, eventName, eventHandler);

        this.onDestroy(() => {
            this.getFactory().getDestroyCallback(inst, PRIVATE)();
            tokenValueGetter = null;
        });
    }
});

export default OnDirective;

OnDirective.has = function (ele) {
    let directiveAttr = "";
    getNodeAttrNames(ele).some(attr => matchesDirective.test(attr) && (directiveAttr = attr));
    return directiveAttr;
};
