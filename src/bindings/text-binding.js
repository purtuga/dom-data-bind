import Compose from "common-micro-libs/src/jsutils/Compose"
import nextTick from "common-micro-libs/src/jsutils/nextTick"

export default Compose.extend({
    init(ele, tokenText) {
        const state = {
            ele,
            tokenText,
            updater: new Function("d", `with (d) {return ${ tokenText };}`)
        };

        PRIVATE.set(this, state);
        this.render();

    },

    render(data) {
        nextTick(() => {
            const { ele, updater } = PRIVATE.get(this);

            ele.nodeValue = updater(data);
        });
    }
});
