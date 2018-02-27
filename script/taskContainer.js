/* function TaskContainer() {
  this.container;
  this.taskCase;
  this.taskItem;
}
TaskContainer.prototype.initContainer = function (header, textInput, btnCreate, taskCase, btnDellAll) {
  this.container = this.createElem({ "div": { class: "taskContainer" } });
  //  var args = [];
  for (var i = 0; i < arguments.length; i++) {
    container.appendChild(this.createElem(arguments[i]));
  }
  this.taskCase = container.querySelector("[data-elem='taskCase']");
  container.querySelector("[data-input='text']").addEventListener("keydown", function (event) {
    if (event.keyCode == "13") {
      var description = event.target.value;
      taskController.create(description, new Date());
    }
  });
  container.querySelector("[data-input='btnCreate']").addEventListener("click", function (event) {
    var description = container.querySelector("[data-input='text']").value;
    taskController.create(description, new Date());
  });
  container.querySelector("[data-input='btnDelAll]").addEventListener("click", function (event) {
    taskController.deleteAll();
  });
  this.taskCase.addEventListener("click", function (event) {
    var element = event.target;
    var id = element.parentElement.getAttribute("data-id");
    if (element.getAttribute("data-taskBtn") == "done") {
      taskController.toggleDone(id);
    } else if (element.getAttribute("data-taskBtn") == "delete") {
      taskController.deleteTask(id);
    }
  });
};

TaskContainer.prototype.initTaskModel = function (textHandler, done, del) {
  this.taskItem = this.createElem({ "li": { class: "list__item" } });
  for (var i = 0; i < arguments.length; i++) {
    taskItem.appendChild(this.createElem(arguments[i]));
  }
};

TaskContainer.prototype.createElem = function (attrObj) {
  for (var tag in attrObj) {
    var elem = document.createElement(tag);
    for (var key in attrObj[tag]) {
      elem.setAttribute(key, attrObj[tag][key]);
    }
  }
  return elem;
};
 */
