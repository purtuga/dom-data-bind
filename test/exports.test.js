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

    it("should have `allDirectives1 as an array", function () {
        expect(domDataBind.allDirectives).to.be.an("array");
    });
});
