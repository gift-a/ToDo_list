"use strict";

//ToDoList generates new ToDo list on your page
// usage: myList = new ToDoList();
//        muList.generateToDoList(name);
function ToDoList() {
  DOMElem.call(this);
}
ToDoList.prototype = Object.create(DOMElem.prototype);
ToDoList.prototype.constructor = ToDoList;
ToDoList.prototype.generateToDoList = function(name) {
  //create box and inner elements
  var name = name || "Your To Do List";
  var todoBox = this.createElem("div", { class: "todo-container" });
  var inner = this.createElems([
    { h1: { class: "header" } },
    {
      input: {
        class: "text",
        type: "text",
        placeholder: "type your to do and click Create or press Enter"
      }
    },
    {
      input: {
        class: "button button_create",
        type: "button",
        value: "Create",
        name: "create"
      }
    },
    {
      input: {
        class: "button button_del-all",
        type: "button",
        value: "Delete all",
        name: "delAll"
      }
    }
  ]);
  inner[0].innerHTML = name;

  //add elements in document
  this.addElems(todoBox, inner);
  document.body.appendChild(todoBox);

  //add handlers for buttons "create" and "delete all"
  inner[1].addEventListener("keydown", function(event) {
    if (event.keyCode == "13") {
      var listItem = new ListItem();
      listItem.addListItem(todoBox, event.target);
    }
  });
  inner[2].addEventListener("click", function(event) {
    var textHandler = todoBox.querySelector("[type=text]");
    var listItem = new ListItem();
    listItem.addListItem(todoBox, textHandler);
  });
  inner[3].addEventListener("click", function(event) {
    var list = todoBox.querySelector(".list");
    ToDoList.prototype.delElem(list);
  });
  return todoBox;
};

// ******** UL with onklick handlers on Done and Del **********

function List() {
  DOMElem.call(this);
  this.list = this.createList(); 
  //create empty list
}
List.prototype = Object.create(DOMElem.prototype);
List.prototype.constructor = List;
List.prototype.addList = function(container) {
  container.insertBefore(this.list, container.querySelector("[name=delAll]"));
};
List.prototype.createList = function() {
  var list = this.createElem("ul", { class: "list" });
  //add handler for clicks on list items
  list.addEventListener("click", function(event) {
    var target = event.target;
    if (target.tagName != "INPUT") return;
    if (target.getAttribute("name") == "done") {
      List.prototype.markItemDone(target.parentElement);
    } else if (target.getAttribute("name") == "del") {
      List.prototype.delElem(target.parentElement);
    }
  });
  return list;
};
List.prototype.markItemDone = function(listItem) {
  listItem.classList.add("list__item_done");
};

// ******** LI with buttons Done and Del **********

function ListItem() {
  DOMElem.call(this);
}
ListItem.prototype = Object.create(DOMElem.prototype);
ListItem.prototype.constructor = ListItem;
ListItem.prototype.addListItem = function(container, textHandler) {
  //cearch list and input data
  var list = container.querySelector(".list"),
    text = textHandler.value;
  //prevent empty items
  if (!text) return;
  var listItem = this.createListItem(text);
  //create list if it does not exsist
  if (!list) {
    var ul = new List();
    ul.addList(container);
    list = ul.list;
  }
  list.appendChild(listItem);
  //clean input field
  textHandler.value = "";
};
ListItem.prototype.createListItem = function(text) {
  //create list item and inner elements
  var listItem = this.createElem("li", { class: "list__item" });
  var inner = this.createElems([
    { span: { class: "item__text" } },
    {
      input: {
        class: "button button_done",
        type: "Button",
        value: "Done!",
        name: "done"
      }
    },
    {
      input: {
        class: "button button_del",
        type: "Button",
        value: "Delete",
        name: "del"
      }
    }
  ]);
  inner[0].innerHTML = text;
  this.addElems(listItem, inner);
  return listItem;
};

// ******** DOM Element with main behavior **********

function DOMElem() {}
// multiple appendChild
// children - array of children
DOMElem.prototype.addElems = function(parent, childrenArr) {
  childrenArr.forEach(function(child) {
    parent.appendChild(child);
  });
};
// input attr: object with keys {attributeName: value}
DOMElem.prototype.createElem = function(tagName, attr) {
  var elem = document.createElement(tagName);
  for (var key in attr) {
    elem.setAttribute(key, attr[key]);
  }
  return elem;
};
// create multiple
// input: array type [{tag1:{attrubute: value}}, tag2{...}...]
// output: array of elements
DOMElem.prototype.createElems = function(tags) {
  var elemArr = [];
  for (var i = 0; i < tags.length; i++) {
    for (var tag in tags[i]) {
      elemArr.push(this.createElem(tag, tags[i][tag]));
    }
  }
  return elemArr;
};
DOMElem.prototype.delElem = function(element) {
  element.parentElement.removeChild(element);
};
