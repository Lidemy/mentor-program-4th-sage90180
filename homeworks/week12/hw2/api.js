/* eslint-disable eqeqeq */
/* eslint-disable no-use-before-define */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-new-object */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-alert */
// 亂數英文字
function makerandomletter(max) {
  let text = '';
  const possible = 'abcdefghijklmnopqrstuvwxyz';
  for (let i = 0; i < max; i += 1) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

// 亂數產生
function randomusefloor(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// 密碼格式 aa000000
const idNumber = makerandomletter(2) + randomusefloor(1, 999999);


$(document).ready(() => {
  // 取得資料

  // 取得token
  let Request = new Object();
  Request = GetRequest();

  function GetRequest() {
    const url = location.search;
    const theRequest = new Object();
    if (url.indexOf('?') != -1) {
      const str = url.substr(1);
      strs = str.split('&');
      for (let i = 0; i < strs.length; i += 1) {
        theRequest[strs[i].split('=')[0]] = decodeURI(strs[i].split('=')[1]);
      }
    }
    return theRequest;
  }

  if (Request.id) {
    $.ajax({
      type: 'GET',
      url: `http://localhost:8080/api_todo/api_todo.php?id=${Request.id}`,
      success: (data) => {
        if (!data.ok) {
          alert('ID 錯誤');
          return;
        }
        const todos = JSON.parse(data.todos[0].content);
        lists = todos;
        display();
      },
    });
  }

  // 儲存資料
  $('.nav-link-save').click((e) => {
    $.ajax({
      headers: {
        Accept: 'application/json; charset=utf-8',
      },
      type: 'POST',
      url: 'http://localhost:8080/api_todo/api_add_todo.php',
      data: {
        content: JSON.stringify(lists),
        id_number: idNumber,
      },
      success: (resp) => {
        if (!resp.ok) {
          alert('儲存失敗');
          return;
        }
        $('.modal-body').html(`
        <div class="text-center">
        儲存成功<br>
        你的ID：${resp.id}<br>
        請以 token 方式帶入<br>
        例：?id=AA000000<br>
      </div>
        `);
      },
    });
  });
});
