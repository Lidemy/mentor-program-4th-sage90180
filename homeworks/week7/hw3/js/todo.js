/* eslint-disable no-alert */
const element = document.querySelector('.main');
const todos = document.querySelector('.todos');

const date = document.querySelector('input[type=date]');
const todo = document.querySelector('.newtodo');
date.valueAsDate = new Date();
element.addEventListener('click', (e) => {
  if (e.target.classList.contains('fa-calendar-plus')) {
    if (!todo.value) {
      alert('請輸入事件');
    } else {
      const newTodo = document.createElement('div');
      newTodo.classList.add('todo_info');
      newTodo.innerHTML = `<div class="edit_check fas fa-check-circle"></div>
    <input class="check" type="checkbox"/>
    <div class="date">${date.value}</div>
    <input class="todo" placeholder="${todo.value}"/>
    <div class="btn_box"> <i class="far fa-edit"></i><i class="far fa-trash-alt"></i></div>
        `;
      todos.appendChild(newTodo);
      date.valueAsDate = new Date();
      todo.value = '';
    }
  }
  if (e.target.classList.contains('check')) {
    const todoList = e.target.parentNode;
    if (e.target.checked) {
      todoList.querySelector('.todo').classList.toggle('done');
      todoList.querySelector('.fa-edit').classList.toggle('displayNone');
    } else {
      todoList.querySelector('.todo').classList.toggle('done');
      todoList.querySelector('.fa-edit').classList.toggle('displayNone');
    }
  }
  if (e.target.classList.contains('fa-edit')) {
    const todoList = e.target.parentNode.parentNode;
    e.target.classList.add('displayNone');
    todoList.querySelector('.date').innerHTML = '<input class="dateinput" type="date"/>';
    todoList.querySelector('.dateinput').valueAsDate = new Date();
    todoList.querySelector('.todo').readOnly = false;
    todoList.querySelector('.todo').classList.add('input_edit');
    todoList.querySelector('.edit_check').classList.toggle('active');
    e.target.classList.add('displayNone');
  }
  if (e.target.classList.contains('fa-trash-alt')) {
    todos.removeChild(e.target.closest('.todo_info'));
  }
  if (e.target.classList.contains('edit_check')) {
    const todoList = e.target.parentNode;
    const newDate = document.querySelector('.dateinput').value;
    todoList.querySelector('.date').innerHTML = newDate;
    todoList.querySelector('.todo').readOnly = true;
    todoList.querySelector('.todo').classList.remove('input_edit');
    todoList.querySelector('.edit_check').classList.toggle('active');
    todoList.querySelector('.fa-edit').classList.remove('displayNone');
  }
});

todo.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    if (!todo.value) {
      alert('請輸入事件');
    } else {
      const newTodo = document.createElement('div');
      newTodo.classList.add('todo_info');
      newTodo.innerHTML = `<div class="edit_check fas fa-check-circle"></div>
    <input class="check" type="checkbox"/>
    <div class="date">${date.value}</div>
    <input class="todo" placeholder="${todo.value}"/>
    <div class="btn_box"> <i class="far fa-edit"></i><i class="far fa-trash-alt"></i></div>
        `;
      todos.appendChild(newTodo);
      date.valueAsDate = new Date();
      todo.value = '';
    }
  }
});

element.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    const todoList = e.target.parentNode;
    const newDate = document.querySelector('.dateinput').value;
    todoList.querySelector('.date').innerHTML = newDate;
    todoList.querySelector('.todo').readOnly = true;
    todoList.querySelector('.todo').classList.remove('input_edit');
    todoList.querySelector('.edit_check').classList.toggle('active');
    todoList.querySelector('.fa-edit').classList.remove('displayNone');
  }
});
