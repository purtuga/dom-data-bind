import {DomDataBind}        from "./DomDataBind.js"
import {render}             from "./render.js"
import {view}               from "./view.js";
import {Directive}          from "./directives/Directive.js"
import * as directives   from "./directives/index.js";

//----------------------------------------------------------------------

const DomDataBindAll = DomDataBind.extend();
const allDirectives = Object.keys(directives).map(directiveName => directives[directiveName]);
DomDataBindAll.directives = allDirectives;

export * from "./directives/index.js"
export default DomDataBindAll;
export {
    DomDataBindAll,
    DomDataBind,
    render,
    view,
    allDirectives,
    directives,
    Directive
};