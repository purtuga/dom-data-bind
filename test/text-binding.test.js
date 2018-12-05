import {render} from "../src/index.js"

describe("Text Binding", function () {
    describe("Basic usage", function () {
        beforeEach(function () {
            this.$view = render(`<div>{{title}}</div>`, {title: "test"});
            this.$div = this.$view.querySelector("div");
        });

        it("should show text value", function () {
            expect(this.$div.textContent).to.equal("test");
            expect(this.$div.childNodes.length).to.equal(1);
        });

        it("should update value on data change", function () {
            this.$view.DomDataBind.setData({ title: "test 2"});
            expect(this.$div.textContent).to.equal("test 2");
        });
    });

    describe("Multiple text nodes (siblings)", function () {
        beforeEach(function () {
            this.data = { title: "test", value: "value 1"};
            this.$view = render(`<div>{{ title }} {{ value }}</div>`, this.data);
            this.$div = this.$view.querySelector("div");
        });

        it("should render both values", function () {
            expect(this.$view.textContent).to.equal("test value 1");
        });

        it("should update values", function () {
            this.data.title = "test 2";
            this.$view.DomDataBind.setData(this.data);
            expect(this.$view.textContent).to.equal("test 2 value 1");

            this.data.value = "value 2";
            this.$view.DomDataBind.setData(this.data);
            expect(this.$view.textContent).to.equal("test 2 value 2");

            this.data.value = this.data.title = "";
            this.$view.DomDataBind.setData(this.data);
            expect(this.$view.textContent).to.equal(" ");
        });
    });

    describe("Text nodes in between other text", function () {
        beforeEach(function () {
            this.data = { title: "test", value: "value 1"};
            this.$view = render(`<div>Initial text {{ title }} is {{ value }}.</div>`, this.data);
            this.$div = this.$view.querySelector("div");
        });

        it("should render in between words", function () {
            expect(this.$view.textContent).to.equal("Initial text test is value 1.");
        });

        it("should update values as expected", function () {
            this.data.title = "test 2";
            this.$view.DomDataBind.setData(this.data);
            expect(this.$view.textContent).to.equal("Initial text test 2 is value 1.");

            this.data.value = "value 2";
            this.$view.DomDataBind.setData(this.data);
            expect(this.$view.textContent).to.equal("Initial text test 2 is value 2.");

            this.data.value = this.data.title = "";
            this.$view.DomDataBind.setData(this.data);
            expect(this.$view.textContent).to.equal("Initial text  is .");
        });
    });

    describe("undefined + null do not add textNode to DOM", function () {
        beforeEach(function () {
            this.data = {title: "test"};
            this.$view = render(`<div>{{title}}</div>`, this.data);
            this.$div = this.$view.querySelector("div");
        });

        it("should not have a textNode if value is null", function () {
            expect(this.$div.childNodes.length).to.equal(1);
            this.data.title = null;
            this.$view.DomDataBind.setData(this.data);
            expect(this.$div.childNodes.length).to.equal(1);
            expect(this.$div.childNodes.item(0).nodeType).to.equal(8); // should be the comment node
        });

        it("should not have a textNode if value is undefined", function () {
            expect(this.$div.childNodes.length).to.equal(1);
            this.data.title = null;
            this.$view.DomDataBind.setData(this.data);
            expect(this.$div.childNodes.length).to.equal(1);
            expect(this.$div.childNodes.item(0).nodeType).to.equal(8); // should be the comment node
        });
    });
});
