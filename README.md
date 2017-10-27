# dom-data-bind

Tiny and supper simple way to bind data to DOM elements. Transforms data to Observables (using [ObservableData](https://github.com/purtuga/observable-data)) so that as it changes, DOM is updated automatically.

## Install

```
$ npm install purtuga/dom-data-bind
```

## Usage

```javascript
import DomDataBind from "dom-data-bind"

const data = {
    firstName: "Paul"
};
const div = document.createElement("div");
div.innerHtml = `<div>{{ firstName }}</div>`;

const divBinder = DomDataBind.create(div, data);

// Later....
data.firstName = "Tom"; // DOM updated automatically

// When widget is no longer needed
divBinder.destroy();

```

### As a HTML drop-in

```html
<script type="text/javascript" src="dom-data-bind/dist/DomDataBind"></script>
<script>
    var binder = DomDataBind.default.create(document.getElementById("bind"), myData);
</script>
```

__NOTE:__ DomDataBind exports several modules. The default one includes all Directives by default and is likely the one you would use.


## Template Token Interpolation

Tokens are defined using the double mustache (curly braces): `{{ }}`. These will be evaluated within the context of the `data` provided on input.

## Directives

All directives start with the underscore character (`_`). Example:

```html
<div _if="visible" _class="{ important: isImportant }">
</div>
```


### _if

Usage:

```html
<div _if="showDiv">...</div>
```

Conditionally render an element and it's bindings based on the `truthy` of an expression.


### _show

Usage:

```html
<div _show="isVisible">...</div>
```

Conditionally show or hide an element (uses  `style.display`). Unlike `_if`, this directive will process the element's children

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

Bind a function to a event or evaluate an expression.  When evaluating an expression, the DOM event object is available as `$ev`

### _each

Usage:

```html
<!-- Arrays -->
<div _each="item in itemsArray">{{ item }}</div>
<div _each="(item, index) in itemsArray">...</div>


<!-- Objects -->
<div _each="value in itemsObject">{{ value }}</div>
<div _each="(value, key) in itemsObject">...</div>
```

Loop through a list using the HTML element as the template for each item.

### _html

Usage:

```html
<div _html="ele.markup"></div>
```

Bind HTML markup to the elements (sets its `innerHTML`). __WARNING__: Inserting markup directly into the page can be dangerous and lead to XSS attacks. 

# License

[MIT](LICENSE)

