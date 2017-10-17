import DomDataBind      from "./DomDataBind"
import Directive        from "./directives/Directive"
import ClassDirective   from "./directives/class-directive"
import StyleDirective   from "./directives/style-directive"
import IfDirective      from "./directives/if-directive"
import ShowDirective    from "./directives/show-directive"
import AttrDirective    from "./directives/attr-directive"
import OnDirective      from "./directives/on-directive"
import EachDirective    from "./directives/each-directive"

const DomDataBindAll = DomDataBind.extend();
DomDataBindAll.directives = [
    EachDirective,
    IfDirective,
    ClassDirective,
    StyleDirective,
    ShowDirective,
    AttrDirective,
    OnDirective
];

export default DomDataBindAll;
export {
    DomDataBind,
    Directive,
    EachDirective,
    IfDirective,
    ClassDirective,
    StyleDirective,
    ShowDirective,
    OnDirective
};