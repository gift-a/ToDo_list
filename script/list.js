function List() {
  this._list = [];
  this._newId = 0;
}

List.prototype.getList = function () {
  return this._list;
};

List.prototype.getTaskById = function (id) {
  return this._list.find(function (item) {
    return item.getId() == id;
  });
};

List.prototype.getNewId = function () {
  return this._newId;
};

List.prototype.stepId = function () {
  this._newId++;
};

List.prototype.setTask = function (description, date) {
  var task = new Task(this.getNewId(), description, date);
  this._list.push(task);
  this.stepId();
};

List.prototype.delTask = function (id) {
  var taskIndex = this._list.indexOf(this.getTaskById(id));
  this._list.splice(taskIndex, 1);
};

List.prototype.clearList = function () {
  this._list = [];
  this._newId = 0;
};

List.prototype.toggleDone = function (id) {
  this.getTaskById(id).toggleDone();
};
