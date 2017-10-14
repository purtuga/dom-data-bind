import DomDataBind      from "./DomDataBind"
import Directive        from "./directives/Directive"
import ClassDirective   from "./directives/class-directive"
import StyleDirective   from "./directives/style-directive"
import IfDirective      from "./directives/if-directive"
import ShowDirective    from "./directives/show-directive"

const DomDataBindAll = DomDataBind.extend();
DomDataBindAll.directives = [
    ClassDirective,
    StyleDirective,
    IfDirective,
    ShowDirective
];

export default DomDataBindAll;
export {
    DomDataBind,
    Directive,
    ClassDirective,
    StyleDirective,
    IfDirective,
    ShowDirective
};