var listBox = document.querySelector(".todo-container");
var addBtn = listBox.querySelector(".addItem");
var delAllBtn = listBox.querySelector("[name=delAll]");

addBtn.addEventListener("click", function(event) {
  addListItem(event.target.parentElement);
});

delAllBtn.addEventListener("click", function(event) {
  deleteAllItems(event.target.parentElement);
});

function addListItem(listBox) {
  var list = listBox.querySelector(".list");
  var text = listBox.querySelector("[type=text]").value
  if (!list) {
    list = createList();
    listBox.insertBefore(list, listBox.querySelector("[name=delAll]"));
  }
  var listItem = createListItem(text);
  list.appendChild(listItem);
}

function deleteAllItems(listBox) {
  var list = listBox.querySelector(".list");
  listBox.removeChild(list);
}

function createListItem(text) {
  var listItem = document.createElement("li"),
    listText = document.createElement("span"),
    doneBtn = document.createElement("input"),
    delBtn = document.createElement("input");
  listItem.className = "list__item";
  listText.innerHTML = "text";
  doneBtn.type = "Button";
  doneBtn.value = "Done!";
  delBtn.type = "Button";
  delBtn.value = "Delete";
  listItem.appendChild(listText);
  listItem.appendChild(doneBtn);
  listItem.appendChild(delBtn);
  return listItem;
}

function createList() {
  list = document.createElement("ul");
  list.className = "list";
  return list;
}

//Вызов elem.cloneNode(true)
//parentElem.removeChild(elem)
