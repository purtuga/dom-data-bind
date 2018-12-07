import {render, view} from "../src/index.js"

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

    describe("Handles values that are HTML Nodes", function () {
        beforeEach(function () {
            this.$view = render(`<div>{{title}}</div>`, {title: "test"});
            this.$div = this.$view.querySelector("div");
            this.$h1 = document.createElement("h1");
            this.$h1.textContent = "h1 header";
        });

        it("should insert a single DOM element", function () {
            this.$view.DomDataBind.setData({ title: this.$h1 });
            expect(this.$div.textContent).to.equal("h1 header");
            expect(this.$div.querySelector("h1")).to.equal(this.$h1);

            this.$view.DomDataBind.setData({ title: "test" });
            expect(this.$div.textContent).to.equal("test");
            expect(this.$div.querySelector("h1")).to.equal(null);
        });

        it("should show a single DOM node (textNode)", function () {
            const nodeEle = document.createTextNode("node text");

            this.$view.DomDataBind.setData({ title: nodeEle });
            expect(this.$div.textContent).to.equal("node text");

            this.$view.DomDataBind.setData({ title: "test" });
            expect(this.$div.textContent).to.equal("test");
        });

        it("should show content of a documentFragment", function () {
            const $h2 = document.createElement("h2");
            $h2.textContent = "h2 header";

            const $frag = document.createDocumentFragment();
            $frag.appendChild(this.$h1);
            $frag.appendChild($h2);

            this.$view.DomDataBind.setData({ title: $frag });
            expect(this.$div.textContent).to.equal("h1 headerh2 header");
            expect(this.$div.querySelector("h1")).to.equal(this.$h1);
            expect(this.$div.querySelector("h2")).to.equal($h2);

            // Setting again with same content should not change result
            this.$view.DomDataBind.setData({ title: $frag });
            expect(this.$div.textContent).to.equal("h1 headerh2 header", "Second time should not have changed results");
            expect(this.$div.querySelector("h1")).to.equal(this.$h1);
            expect(this.$div.querySelector("h2")).to.equal($h2);

            // now replace it with text
            this.$view.DomDataBind.setData({ title: "test" });
            expect(this.$div.textContent).to.equal("test", "document fragment content was not cleared!");
            expect(this.$div.querySelector("h1")).to.equal(null);
            expect(this.$div.querySelector("h2")).to.equal(null);
        });
    });

    describe("Handles values that are View Templates", function () {
        beforeEach(function () {
            this.v1 = view(`<h1>View 1: {{title}}</h1>`);
            this.v2 = view(`<h2>View 2: {{title}}</h2>`);
            this.data = {title: "test", showView: this.v1};
            this.$view = render(`<div>{{ showView }}</div>`, this.data);
            this.$div = this.$view.querySelector("div");
        });

        it("should display content of a given View Template", function () {
            expect(this.$div.textContent).to.equal("View 1: test");
        });

        it("should update existing view with new data if View Template is the same", function () {
            const $v1Ele = this.$div.querySelector("h1");
            expect($v1Ele).to.not.be.null;

            this.data.title = "test 2";
            this.$view.DomDataBind.setData(this.data);
            expect(this.$div.querySelector("h1")).to.equal($v1Ele);
            expect(this.$div.textContent).to.equal("View 1: test 2");
        });

        it("should destroy prior view template if a new one is given as the value", function () {
            const $v1Ele = this.$div.querySelector("h1");
            expect($v1Ele).to.not.be.null;

            this.data.showView = this.v2;
            this.$view.DomDataBind.setData(this.data);
            expect(this.$div.contains($v1Ele)).to.be.false;
            expect(this.$div.querySelector("h2")).to.not.be.null;
        });

    });
});
