function TaskView(container, taskCase, taskItem) {
  this.container = this.createElem({ div: { class: "taskContainer" } });
  this.taskCase = this.createElem({
    ul: {
      "data-elem": "taskCase",
      class: "list"
    }
  });
  this.taskItem = this.createElem({ li: { class: "list__item" } });
}

TaskView.prototype.showTaskCase = function(taskCase) {
  taskCase.forEach(function(taskModel) {
    var item = this.taskItem.cloneNode();
    item.dataset.id = taskModel.id;
    item.querySelecror(
      "[data-output: 'text']"
    ).innerHTML = taskModel._getDescription();
    this.taskCase.appendChild(taskItem);
  });
};

TaskView.prototype.initContainer = function(
  header,
  textInput,
  btnCreate,
  btnDellAll
) {
  for (var i = 0; i < arguments.length; i++) {
    this.container.appendChild(this.createElem(arguments[i]));
  }
  var textHandler = this.container.querySelector("[data-input='text']");
  textHandler.addEventListener("keydown", function(event) {
    if (event.keyCode == "13") {
      var description = event.target.value;
      taskController.create(description, new Date());
    }
  });
  this.container
    .querySelector("[data-input='btnCreate']")
    .addEventListener("click", function(event) {
      var description = textHandler.value;
      taskController.create(description, new Date());
    });
  this.container
    .querySelector("[data-input='btnDelAll']")
    .addEventListener("click", function(event) {
      taskController.deleteAll();
    });
  this.taskCase.addEventListener("click", function(event) {
    var element = event.target;
    var id = element.parentElement.getAttribute("data-id");
    if (element.getAttribute("data-taskBtn") == "done") {
      taskController.toggleDone(id);
    } else if (element.getAttribute("data-taskBtn") == "delete") {
      taskController.deleteTask(id);
    }
  });
};

TaskView.prototype.initTaskModel = function(textHandler, done, del) {
  for (var i = 0; i < arguments.length; i++) {
    this.taskItem.appendChild(this.createElem(arguments[i]));
  }
};

TaskView.prototype.createElem = function(attrObj) {
  for (var tag in attrObj) {
    var elem = document.createElement(tag);
    for (var key in attrObj[tag]) {
      elem.setAttribute(key, attrObj[tag][key]);
    }
  }
  return elem;
};

var taskController = new TaskController(new TaskView(), new TaskCase());
taskController.showContainer(
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
    input: {
      "data-input": "btnDelAll",
      class: "button button_del-all",
      type: "button",
      value: "Delete all",
      name: "delAll"
    }
  }
);
taskController.showContainer();
taskController.initTaskModel(
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
