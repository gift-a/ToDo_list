function Task(id, description, date) {
  this._id = id;
  this._description = description;
  this._date = date;
  this._isDone = false;
}
Task.prototype.getId = function() {
  return this._id;
};
Task.prototype.getDescription = function() {
  return this._description;
};
Task.prototype.setDescription = function(description) {
  this._description = description;
};
Task.prototype.getDate = function() {
  return this._date;
};
Task.prototype.setDate = function(date) {
  this._date = date;
};
Task.prototype.getIsDone = function() {
  return this._isDone;
};
Task.prototype.toggleDone = function() {
  if (!this._isDone) this._isDone = true;
  else this._isDone = false;
};
