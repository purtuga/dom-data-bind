import DomDataBind          from "./DomDataBind.js"
import render               from "./render.js"
import Directive            from "./directives/Directive.js"
import * as allDirectives   from "./directives/index.js";

const DomDataBindAll = DomDataBind.extend();
DomDataBindAll.directives = allDirectives;

export * from "./directives/index.js"
export default DomDataBindAll;
export {
    DomDataBindAll,
    DomDataBind,
    render,
    allDirectives,
    Directive
};