import Compose  from "common-micro-libs/src/jsutils/Compose"
import nextTick from "common-micro-libs/src/jsutils/nextTick"
import {
    setDependencyTracker,
    unsetDependencyTracker,
    stopDependeeNotifications } from "observable-data/src/ObservableObject"

import { PRIVATE, createValueGetter } from "../utils"

//===========================================================

export default Compose.extend({
    init(ele, tokenText) {
        let tokenValueGetterData    = {};
        let updateAlreadyQueued     = false;
        const tokenValueGetter      = createValueGetter(tokenText);
        const updater               = data => {
            if (data) {
                stopDependeeNotifications(updater);
                tokenValueGetterData = data;
            }
            if (updateAlreadyQueued) {
                return;
            }
            updateAlreadyQueued = true;
            nextTick(() => {
                setDependencyTracker(updater);
                try {
                    ele.nodeValue = tokenValueGetter(tokenValueGetterData);
                }
                catch(e) {
                    console.error(e);
                }
                unsetDependencyTracker(updater);
                updateAlreadyQueued = false;
            });
        };
        const state = { updater };

        PRIVATE.set(this, state);

        this.onDestroy(() => {
            stopDependeeNotifications(updater);
            this.getFactory().getDestroyCallback(state, PRIVATE)();
        });
    },

    render(data) {
        PRIVATE.get(this).updater(data);
    }
});
