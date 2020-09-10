/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-undef */

// 設定日期
const now = new Date();
const day = (`0${now.getDate()}`).slice(-2);
const month = (`0${now.getMonth() + 1}`).slice(-2);
const today = `${now.getFullYear()}-${month}-${day}`;
$('input[type=date]').val(today);

let lists = [];

function escape(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

// 代辦事項數目
function count() {
  let i = 0;
  for (const list of lists) {
    if (list.done === false) {
      i += 1;
    }
  }
  $('.todo-footer-number').text(i);
}

// 渲染畫面
function display(status) {
  $('.todo-list-group').html('');
  for (let i = 0; i < lists.length; i += 1) {
    const listHTML = `
      <div class="row todo-list-group-item justify-content-between align-items-center pb-2 pt-2 
      ${status === 'done' ? (lists[i].done ? '' : 'hide') : ''} 
      ${status === 'undone' ? (lists[i].done ? 'hide' : '') : ''}" 
      data-number="${i + 1}">
          <div class="col-md-3 col-12 todo-list-info d-flex align-items-center">
            <input type="checkbox" name="done" class="mr-3" ${lists[i].done ? 'checked' : ''}>
            <div class="todo-list-info-date ${lists[i].done ? 'done' : ''}">${lists[i].date}</div>
          </div>
          <div class="col-12 col-md-6 todo-list-event">
            <input type="text" name="todo" value="${escape(lists[i].thing)}" class="form-control ${lists[i].done ? 'done' : ''}" disabled="disabled">
          </div>
            <div class="todo-list-btns col-md-3 col-12">
            <button class="btn todo-btn-edit fas fa-edit mr-1 ${lists[i].done ? 'hide' : ''}"> 編輯</button>
            <button class="btn todo-btn-delete fas fa-trash-alt mr-2"> 刪除</button>
          </div>
      </div>
      `;
    $('.todo-list-group').append(listHTML);
    $('input[name=content]').val('');
    $('input[type=date]').val(today);
    $('.todo-footer').removeClass('hide');
    count();
  }
}

$(document).ready(
  // 隱藏 footer
  $('.todo-footer').addClass('hide'),
  // 新增文章
  $('.todo-add-btn').click((e) => {
    if ($('input[name=content]').val() === '') {
      $('.alert').fadeIn();
    } else {
      lists.push({
        thing: $('input[name=content]').val(),
        date: $('input[type=date]').val(),
        done: false,
      });
    }
    display();
    $('.alert').fadeOut();
  }),

  // 刪除文章
  $('.todo-list-group').on('click', '.todo-btn-delete', (e) => {
    const todo = $(e.target.parentElement.parentElement);
    const todoOrder = todo.attr('data-number') - 1;
    lists.splice((todoOrder), 1);
    if (lists.length < 1) {
      $('.todo-footer').addClass('hide');
    }
    display();
  }),

  // 全部刪除
  $('.btn-delete-all').click((e) => {
    $('.todo-footer-number').text(('0'));
    lists = [];
    if (lists.length < 1) {
      $('.todo-footer').addClass('hide');
    }
    display();
  }),

  // 完成
  $('.todo-list-group').on('click', 'input[type=checkbox]', (e) => {
    const todo = $(e.target.parentElement.parentElement);
    const todoOrder = todo.attr('data-number') - 1;
    if ($(e.target).prop('checked')) {
      lists[todoOrder].done = true;
      display();
      count();
    } else {
      lists[todoOrder].done = false;
      display();
      count();
    }
  }),

  // 編輯
  $('.todo-list-group').on('click', '.todo-btn-edit', (e) => {
    const todo = $(e.target.parentElement.parentElement);
    const input = todo.find('input[name=todo]');
    const checkbox = todo.find('input[type=checkbox]');
    $(input).removeAttr('disabled', '');
    $(checkbox).prop('checked', false);
    if (!$(checkbox).prop('checked')) {
      $(input).focus();
    }
  }),

  // 只有按編輯才可以編輯
  $('.todo-list-group').on('blur', 'input[name=todo]', (e) => {
    const todo = $(e.target.parentElement.parentElement);
    const todoOrder = todo.attr('data-number') - 1;
    $(e.target).attr('disabled', 'disabled');
    lists[todoOrder].thing = $(e.target).val();
  }),


  // 顯示全部
  $('.show-all').click((e) => {
    display();
    $(e.target).addClass('focus');
    $(e.target).siblings().removeClass('focus');
  }),
  // 已完成
  $('.show-done').click((e) => {
    display('done');
    $(e.target).addClass('focus');
    $(e.target).siblings().removeClass('focus');
  }),
  // 未完成
  $('.show-undone').click((e) => {
    display('undone');
    $(e.target).addClass('focus');
    $(e.target).siblings().removeClass('focus');
  }),
);
