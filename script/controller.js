function Controller(list) {
  this._list = list;
}

Controller.prototype.create = function(description, date) {
  var id = this._list.getId();
  this._list.setTask(id, description, date);
  this.cleanInput();
  this.refreshList(this._list);
};

Controller.prototype.deleteAll = function() {
  if (!this.confirmDel()) return;
  this._list.clearList();
  this.refreshList(this._list);
};

Controller.prototype.deleteTask = function(taskId) {
  if (!this._list.getTaskById(taskId).getIsDone()) {
    if (!this.confirmDel()) return;
  }
  this._list.delTask(taskId);
  this.refreshList(this._list);
};

Controller.prototype.toggleDone = function(taskId) {
  this._list.toggleDone(taskId);
  this.refreshList(this._list);
};
