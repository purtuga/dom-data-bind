const DomDataBind       = window.DomDataBind.default;
const uiFind            = document.querySelector.bind(document);
const dataTextarea      = uiFind("#data > textarea");
const templateTextarea  = uiFind("#template > textarea");
const outEle            = uiFind("#out");
const missingTemplate   = "Template is missing!";
const debounce          = (cb, ms) => {
    let isQueued = null;
    let lastCallArgs;

    return (...args) => {
        lastCallArgs = args;
        if (isQueued) {
            clearTimeout(isQueued);
        }
        isQueued = setTimeout(() => {
            isQueued = null;
            cb(...lastCallArgs);
            lastCallArgs = undefined;
        }, ms || 0);
    };
};
const devData = {
    dataError: ""
};

let data                = {};
let currentBinding;

function sortBy(arr, attr) {
    arr.sort(function (a, b) {
        let attrA = a[attr];
        let attrB = b[attr];

        if (attrA > attrB) {
            return 1;
        }

        if (attrA < attrB) {
            return -1;
        }

        return 0;
    });
}

function getData() {
    let newData;
    devData.dataError = "";
    let fn = new Function('return (' + dataTextarea.value + ');');
    try {
        newData = fn();
    }
    catch(e) {
        console.error(e);
        devData.dataError = e.message;
        newData = {};
    }

    Object.assign(data, newData);
    return data;
}

function createDomBinding() {
    if (currentBinding) {
        currentBinding.destroy();
    }

    outEle.textContent = "";
    outEle.innerHTML = `<div>${templateTextarea.value}</div>` || "<div>{{ missingTemplate }}</div>";
    currentBinding = DomDataBind.create(outEle.firstChild, getData());
}

dataTextarea.addEventListener("keyup", debounce(getData, 1000));
templateTextarea.addEventListener("keyup", debounce(createDomBinding, 1000));
createDomBinding();
DomDataBind.create(uiFind("#dataError"), devData);