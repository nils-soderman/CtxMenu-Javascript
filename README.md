# CtxMenu (Javascript)
Customizable right click context menus for your website.

[demo](https://nilssoderman.com/code/ctxmenu)

## Installation


1. [Download]() the latest version
2. Upload the CtxMenu folder to your server
3. Add the script to the html code of the pages where you'd like to use it 

```html
<script type="text/javascript" src="./CtxMenu/CtxMenu.js"></script>
```
_Note: You must ensure the "src" of the script points to the location of the script on your server._

## Getting Started
The basic setup of a menu:
```javascript
// Initialize a context menu for the entire page
var contextMenu = CtxMenu();

// Add an item to the menu
contextMenu.addItem("Hello World", function(){
  alert("Hello World!")
  });
```

## Documentation

**CtxMenu Initialization:**
```javascript
// Examples of different ways to initialize a context menu:

// Initialize a context menu for the entire page
var contextMenu = CtxMenu();

// Initialize a context menu for a element defined by it's id
var contextMenu = CtxMenu("#example");

// Initialize a context menu for a element defined by it's class
var contextMenu = CtxMenu(".example");

// Initialize a context menu for all types of a certain element by using a nodeName
// The example below will create a context menu for all paragraphs on the page (<p></p>)
var contextMenu = CtxMenu("p");

// Initialize a context menu for a element variable
var myElement = document.getElementById("example");
var contextMenu = CtxMenu(myElement);
```

### CtxMenu Functions:

**addItem(**
text, function, ?icon **)**

_Appends a new item to the menu._

| Arguments | Description |
| --- | --- |
| text | The text that will be displayed in the menu |
| function | The function to be called when the item is clicked |
| icon | Url to an icon to be displayed before the text |

```javascript
myContextMenu.addItem("Text Here", myFunction, "myIcon.png");
```


**insertItem(**
index, text, function, ?icon **)**

_Insert a new item into the menu at given position_

| Arguments | Description |
| --- | --- |
| index | The list index where the item will be placed |
| text | The text that will be displayed in the menu |
| function | The function to be called when the item is clicked |
| icon | Url to an icon to be displayed before the text |

```javascript
myContextMenu.insertItem(0, "Text Here", myFunction, "myIcon.png");
```


**addSeperator()**

_Adds a horizontal line to the menu_
```javascript
myContextMenu.addSeperator();
```
