function Controller(list) {
  this._list = list;
}

Controller.prototype.create = function (description) {
  this._list.setTask(description);
};

Controller.prototype.deleteAll = function () {
  if (!this.confirmDel()) return;
  this._list.clearList();
};

Controller.prototype.deleteTask = function (taskId) {
  if (!this._list.getTaskById(taskId).getIsDone()) {
    if (!this.confirmDel()) return;
  }
  this._list.delTask(taskId);
};

Controller.prototype.toggleDone = function (taskId) {
  this._list.toggleDone(taskId);
};
