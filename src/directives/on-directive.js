import domAddEventListener  from "common-micro-libs/src/domutils/domAddEventListener"
import { observableAssign } from "observable-data/src/ObservableObject"
import Directive            from "./Directive"
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
        let dataForTokenValueGetter = { $data: {} };
        let tokenValueGetter        = createValueGetter(getAttribute(ele, directiveAttr));
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

            dataForTokenValueGetter.$ev = null;

            if ("function" === typeof tokenValue) {
                tokenValue(domEv);
            }
        };
        const updater = data => {
            if (data) {
                if (data.$data) {
                    observableAssign(dataForTokenValueGetter, data);
                }
                else {
                    observableAssign(dataForTokenValueGetter.$data, data);
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
