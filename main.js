var todoBox = document.querySelector(".todo-container");
var btnCreate = todoBox.querySelector("[name=create]");
var btnDelAll = todoBox.querySelector("[name=delAll]");
var listBox = todoBox.querySelector(".list__container");

btnCreate.addEventListener("click", function(event) {
  addListItem(event.target.parentElement);
});

btnDelAll.addEventListener("click", function(event) {
  deleteAllItems(event.target.parentElement);
});

function addListItem(todoBox) {
  var list = todoBox.querySelector(".list");
  var input = todoBox.querySelector("[type=text]");
  var inputText = input.value;
  var listItem = createListItem(inputText);
  if (!list) {
    list = createList();
    todoBox.insertBefore(list, todoBox.querySelector("[name=delAll]"));
  }
  list.appendChild(listItem);
  input.value = "";
}

function createListItem(text) {
  var listItem = document.createElement("li"),
    listText = document.createElement("span"),
    doneBtn = document.createElement("input"),
    delBtn = document.createElement("input");
  listItem.className = "list__item";
  listText.className = "item__text";
  listText.innerHTML = text;
  doneBtn.type = "Button";
  doneBtn.value = "Done!";
  doneBtn.setAttribute("name", "done");
  doneBtn.className = "button button_done";
  delBtn.type = "Button";
  delBtn.value = "Delete";
  delBtn.setAttribute("name", "del");
  delBtn.className = "button button_del";

  listItem.appendChild(listText);
  listItem.appendChild(doneBtn);
  listItem.appendChild(delBtn);

  return listItem;
}

function createList() {
  list = document.createElement("ul");
  list.className = "list";
  list.addEventListener("click", function(event) {
    var target = event.target;
    if (target.tagName != "INPUT") return;
    if (target.getAttribute("name") == "done") {
      markItemDone(target.parentElement);
    } else if (target.getAttribute("name") == "del") {
      delItem(target.parentElement);
    }
  });
  return list;
}

function markItemDone(listItem) {
  listItem.classList.add("list__item_done");
}

function delItem(listItem) {
  listItem.parentElement.removeChild(listItem);
}

function deleteAllItems(todoBox) {
  var list = todoBox.querySelector(".list");
  todoBox.removeChild(list);
}
