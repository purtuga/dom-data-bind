import DomDataBind      from "./DomDataBind"
import Directive        from "./directives/Directive"
import ClassDirective   from "./directives/class-directive"
import StyleDirective   from "./directives/style-directive"
import IfDirective      from "./directives/if-directive"
import ShowDirective    from "./directives/show-directive"
import AttrDirective    from "./directives/attr-directive"

const DomDataBindAll = DomDataBind.extend();
DomDataBindAll.directives = [
    IfDirective,
    ClassDirective,
    StyleDirective,
    ShowDirective,
    AttrDirective
];

export default DomDataBindAll;
export {
    DomDataBind,
    Directive,
    IfDirective,
    ClassDirective,
    StyleDirective,
    ShowDirective
};