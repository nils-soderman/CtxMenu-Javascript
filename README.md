# CtxMenu (Javascript)
Customizable right click context menus for your website.

![preview](https://i.imgur.com/SaBFHEy.png)

[demo](https://nilssoderman.com/code/ctxmenu)

## Installation


1. [Download](https://github.com/nils-soderman/CtxMenu-Javascript/releases) the latest version
2. Upload the CtxMenu folder to your server
3. Add the script to the html code of the pages where you'd like to use it 

```html
<script src="./ctxmenu.min/ctxmenu.min.js"></script>
```
_Note: You must ensure the "src" points to the location of the script on your server._

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
var myContextMenu = CtxMenu();

// Initialize a context menu for a element defined by it's id
var myContextMenu = CtxMenu("#example");

// Initialize a context menu for a element defined by it's class
var myContextMenu = CtxMenu(".example");

// Initialize a context menu for all types of a certain element by using a nodeName
// The example below will create a context menu for all paragraphs on the page (<p></p>)
var myContextMenu = CtxMenu("p");

// Initialize a context menu for a element variable
var myElement = document.getElementById("example");
var myContextMenu = CtxMenu(myElement);
```

### CtxMenu Functions:

**addItem(**

text, function, ?icon, ?index **)**

_Appends a new item to the menu._

| Arguments | Description |
| --- | --- |
| text | The text that will be displayed in the menu |
| function | The function to be called when the item is clicked |
| icon | Url to an icon to be displayed before the text |
| index | The list index where to insert the item |

```javascript
myContextMenu.addItem("Text Here", myFunction, icon = "myIcon.png", index = 0);
```



**addSeperator(**
?index **)**

_Adds a horizontal line to the menu_

| Arguments | Description |
| --- | --- |
| index | The list index where to insert the item |

```javascript
myContextMenu.addSeperator(index = 1);
```
