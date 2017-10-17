# dom-data-bind

Tiny and supper simple way to bind data to DOM elements. Transforms data to Observables so that as it changes, DOM is updated automatically.

## Install

```
$ npm install purtuga/dom-data-bind
```

## Usage

```
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

## Template Token Interpolation

Tokens are defined using the double mustache (curly braces): `{{ }}`. These will be evaluated within the context of the `data` provided on input.

## Directives

All directives start with the letter `b`. Example:

```
<div b-if="visible" b:class="{ important: isImportant }">
</div>
```

Directives that use a dash (`-`) control flow. Directives that use a colon (`:`) bind data to attributes. 

### b-if

Usage:

```
tbd...
```

Conditionally render an element and it's bindings.

### b-show

Usage:

```
tbd...
```

Conditionally show or hide an element (uses  `style.display`).

### b:class

Usage:

```
tbd...
```

Conditionally toggle css class names on an element.

### b:style

Usage:

```
tbd...
```

Conditionally toggle css styles on an element.

### b:attr

Usage:

```
tbd...
```

Bind a value to an Element's attribute. 

### b:on

Usage:

```
tbd...
```

Bind a function to a event.

### b-each

Usage:

```
tbd...
```

Loop through a list using the HTML element as the template for each item.
