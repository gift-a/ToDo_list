"use strict"

class Controller {
  constructor(list) {
    this._list = list;
  }

  create(description) {
    this._list.setTask(description);
  }

  getTaskById(taskId) {
    return this._list.getTaskById(taskId);
  }

  deleteAll() {
    this._list.clearList();
  }

  deleteTask(taskId) {
    this._list.delTask(taskId);
  }

  toggleDone(taskId) {
    this._list.toggleDone(taskId);
  }
}
