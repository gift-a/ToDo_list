"use strict"

class Task {
  constructor(id, description, date = new Date()) {
    // сделать статическим???
    this._id = id;
    this._description = description;
    this._date = date;
    this._isDone = false;
  }

  get id() {
    return this._id;
  }

  get description() {
    return this._description;
  }

  set description(description) {
    this._description = description;
  }

  get date() {
    return this._date;
  }

  set date(date) {
    this._date = date;
  }

  get isDone() {
    return this._isDone;
  }
  set isDone(value) {
    this._isDone = value;
  }
  toggleDone() {
    if (!this.isDone) this.isDone = true;
    else this.isDone = false;
  }
}
