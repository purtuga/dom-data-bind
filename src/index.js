import DomDataBind      from "./DomDataBind"
import render           from "./render"
import Directive        from "./directives/Directive"
import ClassDirective   from "./directives/class-directive"
import StyleDirective   from "./directives/style-directive"
import IfDirective      from "./directives/if-directive"
import ShowDirective    from "./directives/show-directive"
import AttrDirective    from "./directives/attr-directive"
import PropDirective    from "./directives/prop-directive"
import OnDirective      from "./directives/on-directive"
import EachDirective    from "./directives/each-directive"
import HtmlDirective    from "./directives/html-directive"


const allDirectives = [
    EachDirective,
    IfDirective,
    ClassDirective,
    StyleDirective,
    ShowDirective,
    AttrDirective,
    PropDirective,
    OnDirective,
    HtmlDirective
];

const DomDataBindAll = DomDataBind.extend();
DomDataBindAll.directives = allDirectives;

export default DomDataBindAll;
export {
    DomDataBindAll,
    DomDataBind,
    render,
    allDirectives,
    Directive,
    EachDirective,
    IfDirective,
    ClassDirective,
    StyleDirective,
    ShowDirective,
    AttrDirective,
    PropDirective,
    OnDirective,
    HtmlDirective
};