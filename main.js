window.addEventListener("load", function() {
  var myToDoList = new ToDoList();
  //  myToDoList.generateToDoList("Second");
  //  myToDoList.generateToDoList("One more");
});

function ToDoList(name) {
  this._name = name || "Your To Do List";
  this._todoBox = this.generateToDoList(this._name);
}
ToDoList.prototype.generateToDoList = function(name) {
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
  this._appendChildren(todoBox, [header, textInput, btnCreate, btnDelAll]);
  document.body.appendChild(todoBox);

  btnCreate.addEventListener("click", function(event) {
    ToDoList.prototype._addListItem(event.target.parentElement);
  });

  textInput.addEventListener("keydown", function(event) {
    if (event.keyCode == "13") {
      ToDoList.prototype._addListItem(event.target.parentElement);
    }
  });

  btnDelAll.addEventListener("click", function(event) {
    ToDoList.prototype._deleteAllItems(event.target.parentElement);
  });

  return todoBox;
};

ToDoList.prototype._addListItem = function(todoBox) {
  var list = todoBox.querySelector(".list"),
    input = todoBox.querySelector("[type=text]"),
    inputText = input.value;
  if (!inputText) return;
  listItem = this._createListItem(inputText);
  if (!list) {
    list = this._createList();
    todoBox.insertBefore(list, todoBox.querySelector("[name=delAll]"));
  }
  list.appendChild(listItem);
  input.value = "";
};

ToDoList.prototype._createListItem = function(text) {
  var listItem = this._createDOMElement("li", { class: "list__item" }),
    listText = this._createDOMElement("span", { class: "item__text" }),
    doneBtn = this._createDOMElement("input", {
      class: "button button_done",
      type: "Button",
      value: "Done!",
      name: "done"
    }),
    delBtn = this._createDOMElement("input", {
      class: "button button_del",
      type: "Button",
      value: "Delete",
      name: "del"
    });
  listText.innerHTML = text;

  this._appendChildren(listItem, [listText, doneBtn, delBtn]);

  return listItem;
};

ToDoList.prototype._createList = function() {
  var list = this._createDOMElement("ul", { class: "list" });
  list.addEventListener("click", function(event) {
    var target = event.target;
    if (target.tagName != "INPUT") return;
    if (target.getAttribute("name") == "done") {
      ToDoList.prototype._markItemDone(target.parentElement);
    } else if (target.getAttribute("name") == "del") {
      ToDoList.prototype._delItem(target.parentElement);
    }
  });
  return list;
};

// atr - object with keys attributeName: value
ToDoList.prototype._createDOMElement = function(tagName, atr) {
  var elem = document.createElement(tagName);
  for (var key in atr) {
    elem.setAttribute(key, atr[key]);
  }
  return elem;
};

ToDoList.prototype._appendChildren = function(parent, children) {
  children.forEach(function(child) {
    parent.appendChild(child);
  });
};

ToDoList.prototype._markItemDone = function(listItem) {
  listItem.classList.add("list__item_done");
};

ToDoList.prototype._delItem = function(listItem) {
  listItem.parentElement.removeChild(listItem);
};

ToDoList.prototype._deleteAllItems = function(todoBox) {
  var list = todoBox.querySelector(".list");
  todoBox.removeChild(list);
};
