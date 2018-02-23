var listBox = document.querySelectorAll(".todo-container")[0];
var addForm = listBox.querySelector("form[name=addToDo]");
var delAllBtn = listBox.querySelector("[name=delAll]");

addForm.addEventListener("submit", function(event) {
  var trg = event.target;
  addListItem(trg.parentElement, trg.querySelector("[type=text]").value);
});

function addListItem(listBox, text) {
  var list = listBox.querySelector(".list");
  if (!list) {
    list = createList();
    listBox.appendChild(list);
  }
  var listItem = createListItem(text);
  list.appendChild(listItem);
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
