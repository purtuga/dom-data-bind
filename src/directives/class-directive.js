import nextTick     from "common-micro-libs/src/jsutils/nextTick"
import {
    watchProp,
    observableAssign,
    setDependencyTracker,
    unsetDependencyTracker,
    stopDependeeNotifications } from "observable-data/src/ObservableObject"
import Directive                from "./Directive"
import {
    PRIVATE,
    escapeString,
    getAttribute,
    removeAttribute,
    createValueGetter  } from "../utils"

//============================================
const DIRECTIVE             = "b:class";
const matchesDirective      = new RegExp(`^${ escapeString(DIRECTIVE) }$`);

const ClassDirective = Directive.extend({
    init(ele) {
        let cssClassList        = {};
        let updateAlreadyQueued = false;
        let domEleUpdateQueued  = false;
        let dataForGetter       = {};
        const eleClassList      = ele.classList;
        const addClass          = eleClassList.add.bind(eleClassList);
        const removeClass       = eleClassList.remove.bind(eleClassList);
        const containsClass     = eleClassList.contains.bind(eleClassList);
        const directive         = this.directive;
        let tokenValueGetter    = createValueGetter(getAttribute(ele, DIRECTIVE));
        const updater = data => {
            if (data) {
                stopDependeeNotifications(updater);
                dataForGetter = data;
            }
            if (updateAlreadyQueued) {
                return;
            }
            updateAlreadyQueued = true;
            nextTick(() => {
                setDependencyTracker(updater);
                try {
                    observableAssign(cssClassList, tokenValueGetter(dataForGetter));
                }
                catch(e) {
                    console.error(e);
                }
                unsetDependencyTracker(updater);
                updateAlreadyQueued = false;
            });
        };
        const applyClassesToDomEle = () => {
            if (domEleUpdateQueued) {
                return;
            }
            domEleUpdateQueued = true;
            nextTick(() => {
                Object.keys(cssClassList).forEach(className => {
                    if (cssClassList[className] && !containsClass(className)) {
                        addClass(className);
                    }
                    else if (containsClass(className)) {
                        removeClass(className);
                    }
                });
                domEleUpdateQueued = false;
            });
        };
        const inst = { updater };

        inst.classObjEv = watchProp(cssClassList, cssClassList, applyClassesToDomEle);
        removeAttribute(ele, directive);
        PRIVATE.set(this, inst);

        this.onDestroy(() => {
            stopDependeeNotifications(updater);
            this.getFactory().getDestroyCallback(inst, PRIVATE)();
            cssClassList = dataForGetter = tokenValueGetter = null;
        });
    },

    get directive() {
        return DIRECTIVE;
    }
});
export default ClassDirective;

/**
 * Static method that allows to check if a given string matches this directive's string
 *
 * @method ClassDirective#is
 *
 * @param {String} directive
 *
 * @returns {boolean}
 */
ClassDirective.is = function(directive) {
    return matchesDirective.test(directive.trim());
};