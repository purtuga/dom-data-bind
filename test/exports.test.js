import * as domDataBind from "../src/index.js"

describe("ESM Exports", function() {
    [
        "DomDataBindAll",
        "DomDataBind",
        "render",
        "view",
        "allDirectives",
        "directives",
        "Directive"
    ].forEach(exportName => {
        it(`should have export: ${exportName}`, function () {
            expect(domDataBind).to.have.property(exportName);
        });
    });

    it("should have `allDirectives` as an array", function () {
        expect(domDataBind.allDirectives).to.be.an("array");
    });

    it("should have all expected directives in allDirectives array", function () {
        expect(domDataBind.allDirectives.length).to.be.equal(Object.keys(domDataBind.directives).length);
    });
});
