function View(list, container, item) {
  Controller.call(this, list);
  this._item = item;
  this._container = container;
  this.addListeners();
}
View.prototype = Object.create(Controller.prototype);
View.prototype.constructor = View;

View.prototype.refreshList = function () {
  this._container.list.innerHTML = "";
  var self = this;
  this._list.getList().forEach(function (task) {
    var newItem = self._item.item.cloneNode(true);
    newItem.dataset.id = task.getId();
    newItem.querySelector(
      "[data-output='text']"
    ).innerHTML = task.getDescription();
    if (task.getIsDone()) newItem.classList.add("list__item_done");
    self._container.list.appendChild(newItem);
  });
};

View.prototype.getContainer = function () {
  return this._container;
};

View.prototype.confirmDel = function () {
  return confirm("Do you really want to delete?");
};

View.prototype.cleanInput = function () {
  this._container.textInput.value = "";
};

View.prototype.addListeners = function () {
  this._container.textInput.addEventListener(
    "keydown",
    this.onPressEnter.bind(this)
  );
  this._container.btnCreate.addEventListener(
    "click",
    this.onClickCreate.bind(this)
  );
  this._container.btnDelAll.addEventListener(
    "click",
    this.onClickDelAll.bind(this)
  );
  this._container.list.addEventListener("click", this.onClickList.bind(this));
};

View.prototype.onPressEnter = function (e) {
  if (e.keyCode == "13") {
    var description = e.target.value;
    this.create(description);
    this.refreshList(this._list);
    this.cleanInput();
  }
};

View.prototype.onClickCreate = function (e) {
  var description = e.target.parentElement.querySelector("[data-input='text']")
    .value;
  this.create(description);
  this.refreshList(this._list);
  this.cleanInput();
};

View.prototype.onClickDelAll = function (e) {
  this.deleteAll();
  this.refreshList(this._list);
};

View.prototype.onClickList = function (e) {
  var target = e.target;
  if (target.tagName != "INPUT") return;
  var id = target.parentElement.getAttribute("data-id");
  if (target.getAttribute("data-input") == "done") {
    this.toggleDone(id);
  } else if (target.getAttribute("data-input") == "delete") {
    this.deleteTask(id);
  }
  this.refreshList(this._list);
};

/**************   Creating of empty List ***************/
function Container(container, header, textInput, btnCreate, list, btnDelAll) {
  this.container = this.createElem(container);
  this.header = this.createElem(header);
  this.textInput = this.createElem(textInput);
  this.btnCreate = this.createElem(btnCreate);
  this.list = this.createElem(list);
  this.btnDelAll = this.createElem(btnDelAll);
}

Container.prototype.initContainer = function (name) {
  this.header.innerHTML = name || "Your TO Do List";
  this.container.appendChild(this.header);
  this.container.appendChild(this.textInput);
  this.container.appendChild(this.btnCreate);
  this.container.appendChild(this.list);
  this.container.appendChild(this.btnDelAll);
  document.body.appendChild(this.container);
};

Container.prototype.createElem = function (attrObj) {
  for (var tag in attrObj) {
    var elem = document.createElement(tag);
    for (var key in attrObj[tag]) {
      elem.setAttribute(key, attrObj[tag][key]);
    }
  }
  return elem;
};

/**************   Creating of empty List Item ***************/
function Item(item, textOutput, done, del) {
  this.textOutput = this.createElem(textOutput);
  this.btnDone = this.createElem(done);
  this.btnDel = this.createElem(del);
  this.init(item);
}
Item.prototype.init = function (itemObj) {
  this.item = this.createElem(itemObj);
  this.item.appendChild(this.textOutput);
  this.item.appendChild(this.btnDone);
  this.item.appendChild(this.btnDel);
};
Item.prototype.createElem = function (attrObj) {
  for (var tag in attrObj) {
    var elem = document.createElement(tag);
    for (var key in attrObj[tag]) {
      elem.setAttribute(key, attrObj[tag][key]);
    }
  }
  return elem;
};

var container = new Container(
  {
    div: {
      class: "task-container"
    }
  },
  {
    h1: {
      class: "header"
    }
  },
  {
    input: {
      "data-input": "text",
      class: "text",
      type: "text",
      placeholder: "type your to do and click Create or press Enter"
    }
  },
  {
    input: {
      "data-input": "btnCreate",
      class: "button button_create",
      type: "button",
      value: "Create",
      name: "create"
    }
  },
  {
    ul: {
      "data-elem": "list",
      class: "list"
    }
  },
  {
    input: {
      "data-input": "btnDelAll",
      class: "button button_del-all",
      type: "button",
      value: "Delete all",
      name: "delAll"
    }
  }
);
var item = new Item(
  { li: { class: "list__item" } },
  {
    span: {
      "data-output": "text",
      class: "item__text"
    }
  },
  {
    input: {
      "data-input": "done",
      class: "button button_done",
      type: "Button",
      value: "Done!",
      name: "done"
    }
  },
  {
    input: {
      "data-input": "delete",
      class: "button button_del",
      type: "Button",
      value: "Delete",
      name: "del"
    }
  }
);

container.initContainer();
var list = new List();
var view = new View(list, container, item);
