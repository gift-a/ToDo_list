function List() {
  this._list = [];
  this._lastId = 0;
}
List.prototype.getList = function() {
  return this._list;
};
List.prototype.getLastId = function() {
  return this._lastId;
};
List.prototype.setTask = function(taskModel) {
  this._list.push(taskModel);
};
List.prototype.delTask = function(taskId) {
  var taskIndex;
  this._list.forEach(function(task, index) {
    if (task.id == taskId) {
      taskIndex = index;
    }
  });
  this._list.splice(taskIndex, 1);
};
List.prototype.clearList = function() {
  this._list = [];
  this._lastId = 0;
};
List.prototype.toggleDone = function(taskId) {
  this._list.forEach(function(task) {
    if (task.id == taskId) {
      task.toggleDone();
    }
  });
};
