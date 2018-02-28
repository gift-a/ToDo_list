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

List.prototype.setTask = function (description) {
  var task = new Task(this.getNewId(), description, new Date());
  this._list.push(task);
  this.stepId();
};

List.prototype.delTask = function (id) {
  this._list = this._list.filter(function(item){
    return item.getId() != id);
  };
};

List.prototype.clearList = function () {
  this._list.length = 0;
  this._newId = 0;
};

List.prototype.toggleDone = function (id) {
  this.getTaskById(id).toggleDone();
};
