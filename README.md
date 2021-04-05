# CtxMenu (Javascript)
A modern, light weight, object oriented solution for adding right click context menus for your website.

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

<br />

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
<br /><br />

## Documentation

### CtxMenu Initialization:
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
<br />

### CtxMenu Functions:

<br />

**addItem(** text, function, ?icon, ?index **)**

_Appends a new item to the menu._

| Arguments | Description |
| --- | --- |
| text | The text that will be displayed in the menu |
| function | The function to be called when the item is clicked |
| icon | Url to an icon to be displayed before the text |
| index | The list index where to insert the item |

| Return Value |
| --- |
The DIV element of the created seperator

<br>

```javascript
myItem = myContextMenu.addItem("Text Here", myFunction, icon = "myIcon.png", index = 0);
```

<br /><br />

**addSeparator(** ?index **)**

_Adds a horizontal line to the menu_

| Arguments | Description |
| --- | --- |
| index | The list index where to insert the item |

| Return Value |
| --- |
The DIV element of the created seperator
<br>

```javascript
mySeparator = myContextMenu.addSeparator(index = 1);
```

<br /><br />

**getItems()**

_Get all items in the context menu._

| Return Value |
| --- |
A list with all of the DIV elements

```javascript
myItems = myContextMenu.getItems();
```

<br /><br />

**getItemAtIndex(** index **)**

_Get the DIV of an item based on the index. This includes separators too_

| Arguments | Description |
| --- | --- |
| index | The index of the item |

| Return Value |
| --- |
The DIV element

```javascript
myItem = myContextMenu.getItemAtIndex(0);
```

<br />


### Other Functions:
<br />

**CtxMenuBlock(** element **)**

_Block all context menus for this element (nothing will happen on right click)_

```javascript
CtxMenuBlock("#MyClass");
```
<br />

**CtxMenuDefault(** element **)**

_Set the browsers default context menu on a specified element. Useful if E.g. you create a custom context menu for the entire page but would like all text inputs to still use the default context menu._

```javascript
CtxMenuDefault(".MyClass");
```
