

class CtxMenuItem {
	contructor(Function, Text, Category){
		this.Function = Function;
		this.Text = Text;
		this.Category = Category;
	}
}


class CtxMenu {
	constructor(Element){
		if (Element == undefined) {
			Element = document;
		}
		
		this.Element = Element;
		this.Items = {}
		
		
		this._overrideContextMenu(this.Element);
		this.MenuContainer = this.GenerateHtml();
		this.hideMenu();
		
	}
	
	addItem(Item) {
		// Add an item to the menu
		this.Items[Item.Category] = Item;
	}
	
	_overrideContextMenu(Element) {
		// Override the default behaviour of the element
		if (Element.addEventListener) {
		Element.addEventListener('contextmenu', function(e) {
			this.openContextWidow(e.clientX, e.clientY)
			e.preventDefault();
		}.bind(this), false);
		} 
		else {
			Element.attachEvent('oncontextmenu', function() {
				window.event.returnValue = false;
			}.bind(this)
			);
		}
	}
	
	openContextWidow(PosX, PosY){
		// Open the context window at given position
		console.log(PosX)
		this.showMenu();
	}
	
	showMenu(){
		this.MenuContainer.style.display = "block";
	}
	
	hideMenu(){
		this.MenuContainer.style.display = "none";
	}
	
	GenerateHtml() {
		var MenuContainer = document.createElement("div");
		MenuContainer.className = "ctx-menu-wrapper";
		document.body.appendChild(MenuContainer);
		return MenuContainer;
	}
	
	
	
	
	
}


