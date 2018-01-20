import AttrDirective from "./attr-directive"

const matchRegExp = /^_prop\.(.*)/;
export class PropDirective extends AttrDirective {
    static get _matches() { return matchRegExp; }
    static _isProp() { return true; }
}
export default PropDirective;
