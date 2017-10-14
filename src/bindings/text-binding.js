import Compose from "common-micro-libs/src/jsutils/Compose"
import nextTick from "common-micro-libs/src/jsutils/nextTick"
import {
    setDependencyTracker,
    unsetDependencyTracker,
    stopDependeeNotifications } from "observable-data/src/ObservableObject"

import { PRIVATE } from "../utils"

//===========================================================

export default Compose.extend({
    init(ele, tokenText) {
        const tokenValueGetter = new Function("d", `with (d) {return ${ tokenText };}`);
        let tokenValueGetterData = {};
        const updater = data => {
            if (data) {
                stopDependeeNotifications(updater);
                tokenValueGetterData = data;
            }
            nextTick(() => {
                setDependencyTracker(updater);
                try {
                    ele.nodeValue = tokenValueGetter(tokenValueGetterData);
                }
                catch(e) {
                    console.error(e);
                }
                unsetDependencyTracker(updater);
            });
        };
        const state = { updater };

        PRIVATE.set(this, state);

        this.onDestroy(() => {
            stopDependeeNotifications(updater);
            this.getFactory().getDestroyCallback(inst, PRIVATE)();
        });
    },

    render(data) {
        PRIVATE.get(this).updater(data);
    }
});
