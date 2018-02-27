function View(list, container, item) {
  this._list = list;
  this._container = container;
  this._item = item;
}

View.prototype.refreshList = function() {
  console.log("tefresh");
  var self = this;
  this._list.getList().forEach(function(elem) {
    var item = self._item.item.cloneNode();
    item.dataset.id = elem.getId();
    item.querySelector("[data-input='text']").innerHTML = description;
  });
};

View.prototype.getContainer = function() {
  return this._container;
};

function Container(
  controller,
  container,
  header,
  textInput,
  btnCreate,
  list,
  btnDelAll
) {
  this._controller = controller;
  this.container = this.createElem({ div: { class: "taskContainer" } });
  this.header = this.createElem(header);
  this.textInput = this.createElem(textInput);
  this.btnCreate = this.createElem(btnCreate);
  this.list = this.createElem(list);
  this.btnDelAll = this.createElem(btnDelAll);
  var self = this;
}
Container.prototype.initContainer = function(text) {
  this.header.innerHTML = "Your TO Do List";
  this.container.appendChild(this.header);
  this.container.appendChild(this.textInput);
  this.container.appendChild(this.btnCreate);
  this.container.appendChild(this.list);
  this.container.appendChild(this.btnDelAll);
  document.body.appendChild(this.container);

  this.textInput.addEventListener("keydown", this.onPressEnter);
  this.btnCreate.addEventListener("click", this.onClickCreate.bind(this));
  this.btnDelAll.addEventListener("click", this.onClickDelAll);
  this.list.addEventListener("click", this.onClickList);
};

Container.prototype.onPressEnter = function(e) {
  if (e.keyCode == "13") {
    var description = e.target.value;
    self._controller.create(description, new Date());
  }
};

Container.prototype.onClickCreate = function(e) {
  var description = e.target.parentElement.querySelector("[data-input='text']")
    .value;
  this._controller.create(description, new Date());
};

Container.prototype.onClickDelAll = function(e) {
  self._controller.deleteAll();
};

Container.prototype.onClickList = function(e) {
  var element = event.target;
  var id = element.parentElement.getAttribute("data-id");
  if (element.getAttribute("data-input") == "done") {
    self._controller.toggleDone(id);
  } else if (element.getAttribute("data-input") == "delete") {
    self._controller.deleteTask(id);
  }
};

Container.prototype.createElem = function(attrObj) {
  for (var tag in attrObj) {
    var elem = document.createElement(tag);
    for (var key in attrObj[tag]) {
      elem.setAttribute(key, attrObj[tag][key]);
    }
  }
  return elem;
};

function Item(item, textOutput, done, del) {
  this.item = this.createElem(item);
  this.textOutput = this.createElem(textOutput);
  this.btnDone = this.createElem(done);
  this.btnDel = this.createElem(del);
}
Item.prototype.init = function(text, id) {
  this.textOutput.innerHTML = text;
  this.textOutput.dataset.id = id;
  this.item.appendChild(this.textOutput);
  this.item.appendChild(this.btnDone);
  this.item.appendChild(this.btnDel);
};
Item.prototype.createElem = function(attrObj) {
  for (var tag in attrObj) {
    var elem = document.createElement(tag);
    for (var key in attrObj[tag]) {
      elem.setAttribute(key, attrObj[tag][key]);
    }
  }
  return elem;
};

var container = new Container(
  controller,
  {
    div: {
      class: "taskContainer"
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
//controller.initialize();
var list = new List();
var view = new View(list, container, item);
var controller = new Controller(view, list);
