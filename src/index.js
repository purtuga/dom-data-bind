import DomDataBind      from "./DomDataBind"
import Directive        from "./directives/Directive"
import ClassDirective   from "./directives/class-directive"
import StyleDirective   from "./directives/style-directive"

const DomDataBindAll = DomDataBind.extend();
DomDataBindAll.directives = [
    ClassDirective,
    StyleDirective
];

export default DomDataBindAll;
export {
    DomDataBind,
    Directive,
    ClassDirective,
    StyleDirective
};