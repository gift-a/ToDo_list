function List() {
  this._list = [];
  this._newId = 0;
}

List.prototype.getList = function() {
  return this._list;
};

List.prototype.getTaskById = function(id) {
  return this._list.find(function(item) {
    return item.getId() == id;
  });
};

List.prototype.getId = function() {
  return this._newId;
};

List.prototype.stepId = function() {
  this._newId++;
};

List.prototype.setTask = function(id, description, date) {
  var task = new Task(id, description, new Date());
  this._list.push(task);
  this.stepId();
};

List.prototype.delTask = function(taskId) {
  var taskIndex;
  this._list.forEach(function(task, index) {
    if (task.getId() == taskId) {
      taskIndex = index;
    }
  });
  this._list.splice(taskIndex, 1);
};

List.prototype.clearList = function() {
  this._list = [];
  this._newId = 0;
};

List.prototype.toggleDone = function(taskId) {
  this._list.forEach(function(task) {
    if (task.getId() == taskId) {
      task.toggleDone();
    }
  });
};
