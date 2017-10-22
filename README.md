# dom-data-bind

Tiny and supper simple way to bind data to DOM elements. Transforms data to Observables so that as it changes, DOM is updated automatically.

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

All directives start with the letter `b`. Example:

```html
<div b-if="visible" b:class="{ important: isImportant }">
</div>
```

Directives that use a dash (`-`) provide flow control. Directives that use a colon (`:`) bind data to attributes. 

### b-if

Usage:

```html
<div b-if="showDiv">...</div>
```

Conditionally render an element and it's bindings based on the `truthy` of an expression.


### b-show

Usage:

```html
<div b-show="isVisible">...</div>
```

Conditionally show or hide an element (uses  `style.display`). Unlike `b-if`, this directive will process the element's children

### b:class

Usage:

```html
<div b:class="{ 'make-element-red': transaction.atError }">...</div>
```

Conditionally toggle css class names on an element. Class names are defiend in an object as the `key` and it will be applied if the value of that key evaluates to `truthy` and removed if it evaluates to `falsey`.

### b:style

Usage:

```html
<div b:style="{ 'background-color': divStyles.bgcolor }">...</div>
```

Similar to `b:class` but with element styles directly (`style` attribute. Conditionally toggle css styles on an element.

### b:attr.{attr}

Usage:

```html
<div b:attr.title="page1.title">...</div>
```

Bind a value to an Element's attribute. The attribute name is defined by using a period followed by the attribute name.   

### b:on.{event}

Usage:

```html
<a b:on.click>...</>
```

Bind a function to a event.

### b-each

Usage:

```html
<!-- Arrays -->
<div b-each="item in itemsArray">{{ item }}</div>
<div b-each="(item, index) in itemsArray">...</div>


<!-- Objects -->
<div b-each="value in itemsObject">{{ value }}</div>
<div b-each="(value, key) in itemsObject">...</div>
```

Loop through a list using the HTML element as the template for each item.

### b-html

Usage:

```html
<div b-html="ele.markup"></div>
```

Bind HTML markup to the elements (sets its `innerHTML`). __WARNING__: Inserting markup directly into the page can be dangerous and lead to XSS attacks. 

