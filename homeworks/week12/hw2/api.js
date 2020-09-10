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
  let request = new Object();
  request = getRequest();

  function getRequest() {
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
  // 有效 ID
  if (request.id) {
    $.ajax({
      type: 'GET',
      url: `http://mentor-program.co/mtr04group5/sage/week12/hw2/api_todo.php?id=${request.id}`,
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
    if (lists.length === 0) {
      $('.modal-body').html(`
        <div class="text-center">
        儲存失敗<br>
        <span class="red">請先輸入內容</span>
      </div>
        `);
      return;
    }
    $.ajax({
      headers: {
        Accept: 'application/json; charset=utf-8',
      },
      type: 'POST',
      url: 'http://mentor-program.co/mtr04group5/sage/week12/hw2/api_add_todo.php',
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
        ex：---/index.html<span class="red">?id=AA000000</span><br>
      </div>
        `);
      },
    });
  });
});
