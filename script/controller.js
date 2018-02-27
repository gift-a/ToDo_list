function Controller(view, list) {
  this._view = view;
  this._list = list;
}
Controller.prototype.showContainer = function() {
  this._view.refreshList();
};

Controller.prototype.showList = function() {
  this._view.refreshList(this._list);
};

Controller.prototype.create = function(description, date) {
  var id = this._list.getLastId();
  this._list.setTask(new Task(id, description, date));
  this.showList();
};
Controller.prototype.deleteAll = function() {
  this._list.clearList();
  this.showList();
};

Controller.prototype.deleteTask = function(taskId) {
  this._list.delTask(taskId);
  this.showList();
};
Controller.prototype.toggleDone = function(taskId) {
  this._list.toggleDone(taskId);
  this.showList();
};

/* Controller.prototype.initialize = function initialize() {
  this._view._container.onPressEnter = this.onPressEnter.bind(this);
  this._view._container.onClickCreate = this.onClickCreate.bind(this);
  this._view._container.onClickDelAll = this.onClickDelAll.bind(this);
  this._view._container.onClickList = this.onClickList.bind(this);
};

Controller.prototype.onPressEnter = function (e) {
  if (event.keyCode == "13") {
    // **************  поменять
    var description = event.target.value;
    this.create(description, new Date());
  }
};

Controller.prototype.onClickCreate = function (e) {
  var description = this._view.getContainer().textInput.value;
  this.create(description, new Date());
};

Controller.prototype.onClickDelAll = function (e) {
  this.deleteAll();
};

Controller.prototype.onClickList = function (e) {
}; */
/*
Controller.prototype.initTaskModel = function (textHandler, done, del) {
  this._view.initTaskModel(textHandler, done, del);
};
*/
