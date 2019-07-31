/*
* CtxMenu
* Author: Nils Soderman <contact@nilssoderman.com>
* Repo: https://github.com/nils-soderman/Javascript-contextMenu
*/

ECtxMenuNames = {
	menu: 			"ctx-menu-wrapper",
	item: 			"ctx-menu-item",
	seperator:	"ctx-menu-seperator",
	hasIcon: 		"ctx-menu-hasIcon"
};


class CtxMenuManagerClass {
	constructor(){
		this._currentMenuVisible = null;
		this._ctxMenus = new Map();

		document.addEventListener('contextmenu', this._eventOpenMenu.bind(this));

		var scripts = document.getElementsByTagName('script');
		var path = scripts[scripts.length - 1].src.split('?')[0];
		var CtxMenuDirectory = path.split('/').slice(0, -1).join('/') + '/';

		// Load the stylesheet
		var link = document.createElement( "link" );
		link.href = CtxMenuDirectory + "ctxmenu.css";
		link.type = "text/css";
		link.rel = "stylesheet";
		document.getElementsByTagName("head")[0].appendChild(link);

	};

	_eventOpenMenu(e){
		var menu = null;
		if (e.path != undefined) {
			 menu = this._traceCtxMenu(e.path);
			 var elementClicked = e.path[0];
		} else {
			menu = this._msEdgeTraceCtxMenu(e.target);
			var elementClicked = e.target;
		}

		if (menu == false){
			e.preventDefault();
		}
		else if (menu == true){
			this.closeCurrentlyOpenedMenu();
		}
		else if (menu != null) {
			// Open the menu
			this.closeCurrentlyOpenedMenu();
			menu._elementClicked = elementClicked;
			menu.openMenu(e.clientX, e.clientY);
			this._currentMenuVisible = menu;
			document.addEventListener("click", CtxCloseCurrentlyOpenedMenus);
			e.preventDefault();
			if(menu._openEventListener != undefined) {
				menu._openEventListener();
			}
		}

	};

	closeMenu(menu){
		//this.ctxMenuBackground.style.display = "none";
		menu.closeMenu();
		this._currentMenuVisible = null;
		document.removeEventListener("click", CtxCloseCurrentlyOpenedMenus);
	};

	closeCurrentlyOpenedMenu(){
		if (this._currentMenuVisible != null){
			this.closeMenu(this._currentMenuVisible);
		}
	};

	_traceCtxMenu(path){
		for (var i = 0; i < path.length; ++i) {
			var menu = this._ctxMenusHas(path[i]);
			if (menu != null){
				return menu;
			}
		}
		return null;
	};

	_msEdgeTraceCtxMenu(element){
		while (element != null) {
			var menu = this._ctxMenusHas(element);
			if (menu != null){
				return menu;
			}
			element = element.parentNode;
		}
		return null;
	}

	_ctxMenusHas(element){
		if (this._ctxMenus.has(element)) {
			return this._ctxMenus.get(element);
		}
		if(this._ctxMenus.has("#"+element.id)){
			return this._ctxMenus.get("#"+element.id);
		}
		if (element.className != undefined){
			var classNames = element.className.split(" ");
			for(var i = 0; i < classNames.length; i++) {
				if(this._ctxMenus.has("."+classNames[i])){
					return this._ctxMenus.get("."+classNames[i]);
				}
			}
		}
		if (this._ctxMenus.has(element.nodeName)) {
			return this._ctxMenus.get(element.nodeName);
		}
		return null;
	}

	getMenuFromElement(element){
		return this._ctxMenus.get(element);
	};

	createNewMenu(element){
		var menu = new CtxMenuClass(element);
		this._ctxMenus.set(element, menu);
		return menu;
	};

	blockContextMenu(element){
		this._ctxMenus.set(element,  false);
	};

	setDefaultContextMenu(element){
		this._ctxMenus.set(element,  true);
	}

};

class CtxMenuItem {
	constructor(text, customFunction, icon) {
		this.function = customFunction;
		this.text = text;

		this.element = document.createElement("div");
		this.element.className = ECtxMenuNames.item;

		var iconElement = document.createElement("img");
		if (icon != undefined && icon != null) {
			iconElement.src = icon;
			this.bHasIcon = true;
		} else {
			this.bHasIcon = false;
		}
		this.element.appendChild(iconElement);
		this.element.innerHTML += this.text;

	}
}

class CtxMenuClass {
	constructor(element){

		// Add the html to the body and hide it
		this.menuContainer = document.createElement("div");
		this.menuContainer.className = ECtxMenuNames.menu;
		document.body.appendChild(this.menuContainer);
		this.closeMenu();

		this._elementClicked = undefined;

		// Event listeners
		this._openEventListener = undefined;
		this._closeEventListener = undefined;
		this._clickEventListener = undefined;
	}

	addItem(text, customFunction, icon = undefined) {
		// Add an item to the menu
		var item = this._createMenuItem(text, customFunction, icon);
		this.menuContainer.appendChild(item.element);
		return item;
	}

	insertItem(index, text, customFunction, icon = undefined){
		var item = this._createMenuItem(text, customFunction, icon);
		this.menuContainer.insertBefore(item.element, this.menuContainer.childNodes[index]);
		return item;
	}

	addSeperator(){
		// Add a seperator
		var seperator = document.createElement("div");
		seperator.className = ECtxMenuNames.seperator;
		this.menuContainer.appendChild(seperator);
	}

	removeItem(item) {
		// Remove an item from the menu
		this.menuContainer.removeChild(item.element);
	}

	addEventListener(type, listener){
		if (type == "open"){
			this._openEventListener = Listener;
		}
		else if (type == "close") {
			this._closeEventListener = Listener;
		}
		else if (type == "click") {
			this._clickEventListener = Listener;
		}
	}

	openMenu(x, y){
		this.menuContainer.style.display = "block";
		// Set the screen position of the menu

		// Ensure the menu doesn't go outside of the widnow
		if (x + this.menuContainer.offsetWidth > window.innerWidth) {
			x = window.innerWidth - this.menuContainer.offsetWidth - 1;
		}

		if (y + this.menuContainer.offsetHeight > window.innerHeight) {
			y = window.innerHeight - this.menuContainer.offsetHeight - 1;
		}

		this.menuContainer.style.left = x + "px";
		this.menuContainer.style.top = y + "px";
	}

	closeMenu(){
		// Hide the menu
		this.menuContainer.style.left = "0px";
		this.menuContainer.style.top = "0px";
		this.menuContainer.style.display = "none";
		if (this._closeEventListener != undefined){
			this._closeEventListener();
		}
	}

	_createMenuItem(text, customFunction, icon){
		var item = new CtxMenuItem(text, customFunction, icon);
		item.element.addEventListener("click", function(){
			this._callItem(item);
		}.bind(this));

		if (item.bHasIcon){
			this.menuContainer.classList.add(ECtxMenuNames.hasIcon);
		}

		return item;
	}

	_callItem(item){
		// Called when an item has been clicked
		this.closeMenu();
		// Delay function one tick so the page has time to redraw the page and hide the context menu
		setTimeout(function(){
			item.function(this._elementClicked);
			if (this._clickEventListener != undefined) {
				this._clickEventListener(item);
			}
		}.bind(this), 1);


	}

}

function CtxMenu(element){
	// Initialize a context meun
	if (element == undefined){
		element = document;
	}
	if (ctxMenuManager.getMenuFromElement(element) != undefined) {
		return ctxMenuManager.getMenuFromElement(element);
	}
	return ctxMenuManager.createNewMenu(element);

}

function CtxMenuBlock(element){
	// Block the context menu from appearing on an element
	ctxMenuManager.blockContextMenu(element);
}

function CtxMenuDefault(element){
	// Set an element to use the browsers default context menu
	ctxMenuManager.setDefaultContextMenu(element);
}

function CtxCloseCurrentlyOpenedMenus(){
	ctxMenuManager.closeCurrentlyOpenedMenu();
}

// Initialize the ctxMenuManager
var ctxMenuManager = new CtxMenuManagerClass();
