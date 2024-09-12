const ftList = document.getElementById("ft_list");
const newTaskBtn = document.getElementById("new_task");

window.onload = function () {
  loadTodoList();
};

newTaskBtn.addEventListener("click", function () {
  const task = prompt("Enter a new TO DO:");
  if (task) {
    addTodo(task);
    saveTodoList();
  }
});

function addTodo(task) {
  const todoItem = document.createElement("div");
  todoItem.className = "todo-item";
  todoItem.textContent = task;

  todoItem.addEventListener("click", function () {
    const confirmDelete = confirm("Do you want to remove this TO DO?");
    if (confirmDelete) {
      todoItem.remove();
      saveTodoList();
    }
  });

  ftList.insertBefore(todoItem, ftList.firstChild);
}

function saveTodoList() {
  const todos = [];
  const todoItems = document.querySelectorAll(".todo-item");
  todoItems.forEach(function (item) {
    todos.push(item.textContent);
  });
  document.cookie = `todos=${JSON.stringify(todos)}; path=/`;
}

function loadTodoList() {
  const cookies = document.cookie.split(";");
  let todoCookie = cookies.find((cookie) => cookie.trim().startsWith("todos="));

  if (todoCookie) {
    const todoList = JSON.parse(todoCookie.split("=")[1]);
    todoList.forEach((task) => addTodo(task));
  }
}