import AttrDirective from "./attr-directive"

export const PropDirective = AttrDirective.extend({});
export default PropDirective;

AttrDirective._matches = /^_prop\.(.*)/;
AttrDirective._isProp = true;
