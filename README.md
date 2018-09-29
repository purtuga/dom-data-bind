# dom-data-bind

Tiny and supper simple way to bind data to DOM elements. Transforms data to Observables (using [Observables](https://github.com/purtuga/observables)) so that as it changes, DOM is updated automatically. Updates are always applied async (`nextTick`) in order to minimize DOM interactions.

[See Todo app demo](http://jsbin.com/qisojaveme/2)

## Install

```bash
$ npm install purtuga/dom-data-bind --save-dev
```

## Usage

```javascript
import {render, allDirectives} from "dom-data-bind"

const data = {
    firstName: "Paul"
};
const div = document.createElement("div");
const divBinder = render(`<div>{{ firstName }}</div>`, data, allDirectives);

// Later....
data.firstName = "Tom"; // DOM updated automatically

// rendered DOM is no longer needed, stop its data watchers
// This is important in case your data is persisted beyond the life
// of the rendered element
divBinder.DomDataBind.destroy();

```

### As a HTML drop-in

```html
<script type="text/javascript" src="dom-data-bind/dist/DomDataBind"></script>
<script>
    var binder = DomDataBind.render(`<div>hello world!</div>`, myData);
</script>
```

__NOTE:__ DomDataBind exports several modules. The default one includes all Directives by default and is likely the one you would use.


## Template Token Interpolation

Tokens are defined using the double mustache (curly braces): `{{ }}`. These will be evaluated within the context of the `data` provided on input.

## Directives

All directives start with the underscore character (`_`). Example:

```html
<div _if="visible" _on.click="sayHello">{{ label.clickme }}</div>
```


### _if

Usage:

```html
<div _if="showDiv">...</div>
```

Conditionally render an element and it's bindings based on the `truthy` of an expression.

>   Note: in order to hide these types of conditional elements on initial page rendering, the following CSS rule should be added to you page stylesheet:
>
>       [_if] {
>           display: none;
>       }


### _show

Usage:

```html
<div _show="isVisible">...</div>
```

Conditionally show or hide an element (uses  `style.display`). Unlike `_if`, this directive will process the element's children.

>   Note: in order to hide these types of conditional elements on initial page rendering, the following CSS rule should be added to you page stylesheet:
>
>       [_show] {
>           display: none;
>       }

### _class

Usage:

```html
<div _class="{ 'make-element-red': transaction.atError }">...</div>
```

Conditionally toggle css class names on an element. Class names are defined in an object as the `key` and it will be applied if the value of that key evaluates to `truthy` and removed if it evaluates to `falsey`.

### _style

Usage:

```html
<div _style="{ 'background-color': divStyles.bgcolor }">...</div>
```

Similar to `_class` but with element styles directly (`style` attribute. Conditionally toggle css styles on an element.

### _attr.{attr}

Usage:

```html
<div _attr.title="page1.title">...</div>
```

Bind a value to an Element's attribute. The attribute name is defined by using a period followed by the attribute name.   

### _on.{event}

Usage:

```html
<a _on.click="doClick">...</a>
<!-- or: just evaluate an expression -->
<a _on.click="isDone ? runClick($ev) : validateClick($ev)"></a>
```

Bind a function to a event or evaluate an expression.  When evaluating an expression, the DOM event object is available as `$ev`.

### _each

Usage:

```html
<!-- Arrays -->
<div _each="item in itemsArray">{{ item }}</div>
<div _each="(item, index) in itemsArray">...</div>


<!-- Objects -->
<div _each="value in itemsObject" _key="value.id">{{ value.name }}</div>
<div _each="(value, key) in itemsObject">...</div>
```

Loop through a list using the HTML element as the template for each item.
For efficiency, each template item should have a unique id that can be used with the `_key` directive.  

>   Note: in order to hide these types of conditional elements on initial page rendering, the following CSS rule should be added to you page stylesheet:
>
>       [_each] {
>           display: none;
>       }

### _html

Usage:

```html
<div _html="ele.markup"></div>
```

Bind HTML markup to the elements (sets its `innerHTML`). __WARNING__: Inserting markup directly into the page can be dangerous and lead to XSS attacks. 


## Custom Element Constructor (`DomDataBindElement`)

A Custom Element constructor (base class) is also provided which uses ComponentElement. To use it, ComponentElement must first be installed - installation of his library will not install it automatically.

The `DomDataBindElement` will contain an instance member called `state` which is an `Observable`. The Element's template, when rendered, will be provided with an object containing two properties: `props` and `state`.

Example:

```javascript
import {DomDataBindElement} from "dom-data-bind/src/DomDataBindElement"

class MyEle extends DomDataBindElement {
    static get template() {
        return `<div>{{state.msg}}</div>`;
    }
    
    ready() {
        this.state.msg = "hello world!";
    }
}
```


# License

[MIT](LICENSE)


# TODO

- [ ] Support directive `modifiers` - similar to VueJS... like: `.once` (does not bind, but rather only sets one time)

