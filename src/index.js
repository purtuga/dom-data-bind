import {DomDataBind}        from "./DomDataBind.js"
import {render}             from "./render.js"
import {view}               from "./view.js";
import {Directive}          from "./directives/Directive.js"
import * as directives   from "./directives/index.js";

//----------------------------------------------------------------------

const DomDataBindAll = DomDataBind.extend();
const allDirectives = [directives.EachDirective, directives.IfDirective];

Object.keys(directives).forEach(directiveName => {
    if (allDirectives.indexOf(directives[directiveName]) === -1) {
        allDirectives.push(directives[directiveName]);
    }
});

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