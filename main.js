window.addEventListener("load", function() {
  var myToDoList = new ToDoList();
  console.log(myToDoList.getName());
  console.dir(myToDoList.getToDoBox());
});

function ToDoList(name) {
  this._name = name || "Your To Do List";
  this._todoBox = this._generateToDoList(this._name);
}

ToDoList.prototype.getName = function() {
  return this._name;
};

ToDoList.prototype.getToDoBox = function() {
  return this._todoBox;
};

ToDoList.prototype._generateToDoList = function(name) {
  //create box and inner elements
  var todoBox = this._createDOMElement("div", { class: "todo-container" }),
    textInput = this._createDOMElement("input", {
      class: "text",
      type: "text",
      placeholder: "type your to do and click Create or press Enter"
    }),
    btnCreate = this._createDOMElement("input", {
      class: "button button_create",
      type: "button",
      value: "Create",
      name: "create"
    }),
    btnDelAll = this._createDOMElement("input", {
      class: "button button_del-all",
      type: "button",
      value: "Delete all",
      name: "delAll"
    }),
    header = this._createDOMElement("h1", { class: "header" });

  header.innerHTML = name || "Your To Do List";

  //add elements in document
  this._appendChildren(todoBox, [header, textInput, btnCreate, btnDelAll]);
  document.body.appendChild(todoBox);

  //add handlers for buttons "create" and "delete all"
  btnCreate.addEventListener("click", function(event) {
    ToDoList.prototype._addListItem(todoBox);
  });

  textInput.addEventListener("keydown", function(event) {
    if (event.keyCode == "13") {
      ToDoList.prototype._addListItem(todoBox);
    }
  });

  btnDelAll.addEventListener("click", function(event) {
    ToDoList.prototype._deleteAllItems(todoBox);
  });

  return todoBox;
};

ToDoList.prototype._deleteAllItems = function(todoBox) {
  var list = todoBox.querySelector(".list");
  todoBox.removeChild(list);
};

ToDoList.prototype._addListItem = function(parent, children, valueHandler) {
  //cearch list and input data
  var list = todoBox.querySelector(".list"),
    input = todoBox.querySelector("[type=text]"),
    inputText = input.value;
  //prevent empty items
  if (!inputText) return;
  listItem = this._createListItem(inputText);
  //create list if it does not exsist
  if (!list) {
    list = this._createList();
    todoBox.insertBefore(list, todoBox.querySelector("[name=delAll]"));
  }
  list.appendChild(listItem);
  //clean input field
  input.value = "";
};

function List() {
  Entity.call(this);
  //create empty list
  this._list = this.createDOMElement("ul", { class: "list" });
  //add handler for clicks on list items
  this._list.addEventListener("click", function(event) {
    var target = event.target;
    if (target.tagName != "INPUT") return;
    if (target.getAttribute("name") == "done") {
      List.prototype._markItemDone(target.parentElement);
    } else if (target.getAttribute("name") == "del") {
      List.prototype._delItem(target.parentElement);
    }
  });
  return this._list;
}
List.prototype = Object.create(Entity.prototype);
List.prototype.constructor = ListItem;
List.prototype._markItemDone = function(listItem) {
  listItem.classList.add("list__item_done");
};
List.prototype._delItem = function(listItem) {
  listItem.parentElement.removeChild(listItem);
};

function ListItem() {
  Entity.call(this);
  //create list item and inner elements
  this._listItem = this.createDOMElement("li", { class: "list__item" });
  this._listText = this.createDOMElement("span", { class: "item__text" });
  this._doneBtn = this._createDOMElement("input", {
    class: "button button_done",
    type: "Button",
    value: "Done!",
    name: "done"
  });
  this._delBtn = this._createDOMElement("input", {
    class: "button button_del",
    type: "Button",
    value: "Delete",
    name: "del"
  });
  this._listText.innerHTML = text;
  //add inner elements in list item
  this.createEntity(this._listItem, [
    this._listText,
    this._doneBtn,
    this._delBtn
  ]);

  return this._listItem;
}
ListItem.prototype = Object.create(Entity.prototype);
ListItem.prototype.constructor = ListItem;

function Entity() {}
// multiple appendChild
// children - array of children
Entity.prototype.createEntity = function(parent, children) {
  children.forEach(function(child) {
    parent.appendChild(child);
  });
};

// atr - object with keys {attributeName: value}
Entity.prototype.createDOMElement = function(tagName, atr) {
  var elem = document.createElement(tagName);
  for (var key in atr) {
    elem.setAttribute(key, atr[key]);
  }
  return elem;
};
Entity.prototype.addEntity = function(parent, entity, child, valueHandler) {
  //cearch list and input data
  //  var list = todoBox.querySelector(".list"),
  //    input = todoBox.querySelector("[type=text]"),
  //    inputText = input.value;

  /************* CHECK ABOVE!!! *****************/

  var value = valueHandler.value;
  //prevent empty items
  if (!value) return;
  child = this._createListItem(inputText);
  //create list if it does not exsist
  if (!entity) {
    entity = this.createEntity(parent, entity);
    todoBox.insertBefore(list, todoBox.querySelector("[name=delAll]"));
  }
  list.appendChild(listItem);
  //clean input field
  input.value = "";
};
