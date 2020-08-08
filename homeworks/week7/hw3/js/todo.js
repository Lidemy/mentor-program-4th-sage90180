/* eslint-disable no-use-before-define */
/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable no-alert */
const todo = document.querySelector('.newtodo');
const date = document.querySelector('input[type=date]');
date.valueAsDate = new Date();

document.querySelector('.main').addEventListener('click', (e) => {
  if (e.target.classList.contains('fa-calendar-plus')) {
    if (!todo.value) {
      alert('請輸入事件');
    } else {
      const newTodo = document.createElement('div');
      getInput(date, newTodo);
    }
  }
  if (e.target.classList.contains('fa-trash-alt')) {
    document.querySelector('.todos').removeChild(e.target.closest('.todo_info'));
  }
  if (e.target.classList.contains('fa-edit')) {
    const todoList = e.target.parentNode.parentNode;
    todoList.querySelector('.date').innerHTML = '<input class="dateinput" type="date"/>';
    e.target.classList.add('displayNone');
    todoList.querySelector('.dateinput').valueAsDate = new Date();
    todoList.querySelector('.todo').readOnly = false;
    todoList.querySelector('.todo').classList.add('input_edit');
    todoList.querySelector('.edit_check').classList.toggle('active');
  }
  if (e.target.classList.contains('edit_check')) {
    const todoList = e.target.parentNode;
    editInput(todoList);
  }
  if (e.target.classList.contains('check')) {
    const todoList = e.target.parentNode;
    if (e.target.checked) {
      todoList.querySelector('.todo').classList.add('done');
      todoList.querySelector('.fa-edit').classList.add('displayNone');
    } else {
      todoList.querySelector('.todo').classList.remove('done');
      todoList.querySelector('.fa-edit').classList.remove('displayNone');
    }
  }
});

todo.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    if (!todo.value) {
      alert('請輸入事件');
    } else {
      const newTodo = document.createElement('div');
      getInput(date, newTodo);
    }
  }
});

document.querySelector('.todos').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    const todoList = e.target.parentNode;
    editInput(todoList);
  }
});

function editInput(todoList) {
  todoList.querySelector('.date').innerText = todoList.querySelector('.dateinput').value;
  todoList.querySelector('.todo').readOnly = true;
  todoList.querySelector('.todo').classList.remove('input_edit');
  todoList.querySelector('.edit_check').classList.toggle('active');
  todoList.querySelector('.fa-edit').classList.remove('displayNone');
}

function getInput(date, newTodo) {
  newTodo.classList.add('todo_info');
  newTodo.innerHTML = `<div class="edit_check fas fa-check-circle"></div>
    <input class="check" type="checkbox"/>
    <div class="date">${date.value}</div>
    <input class="todo" placeholder="${todo.value}"/>
    <div class="btn_box"> <i class="far fa-edit"></i><i class="far fa-trash-alt"></i></div>`;
  document.querySelector('.todos').appendChild(newTodo);
  document.querySelector('input[type=date]').valueAsDate = new Date();
  todo.value = '';
}
