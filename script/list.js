"use strict"

class List {
  constructor() {
    this._list = [];
    this._newId = 0;
  }
  get list() {
    return this._list;
  }

  getTaskById(id) {
    return this.list.find(function (item) {
      return item.id == id;
    });
  }

  get newId() {
    return this._newId;
  }

  stepId() {
    this._newId++;
  }

  addTask(description) {
    let task = new Task(this.newId, description, new Date());
    this.list.push(task);
    this.stepId();
  }

  delTask(id) {
    let taskIndex = this.list.indexOf(this.getTaskById(id));
    this.list.splice(taskIndex, 1);
  }

  toggleDone(id) {
    this.getTaskById(id).toggleDone();
  }

  clearList() {
    this._list = [];
    this._newId = 0;
  }
}

let list = new List();
console.log(list.list);
list.addTask("my new task");
list.addTask("my new task1");
list.addTask("my new task2");
console.log(list.getTaskById(0));
console.log(list.newId);
console.log(list.getTaskById(1));
list.toggleDone(1);
list.delTask(0);
console.log(list.list);
list.clearList();
console.log(list.list);
