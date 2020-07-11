const request = require('request');

const API_URL = 'https://lidemy-book-store.herokuapp.com';
const action = process.argv[2];
const key = process.argv[3];

function showBooks() {
  request({
    url: `${API_URL}/books?_limit=20`,
  }, (error, _response, body) => {
    if (error) {
      console.log('載入失敗', error);
      return;
    }
    let data;
    try {
      data = JSON.parse(body);
      for (let i = 0; i < data.length; i += 1) {
        console.log(data[i].id, data[i].name);
      }
    } catch (e) {
      console.log(e); // 錯誤處理
    }
  });
}

function readBook(id) {
  request(`${API_URL}/books/${id}`,
    (error, _response, body) => {
      if (error) {
        console.log('載入失敗', error);
        return;
      }
      let data;
      try {
        data = JSON.parse(body);
        console.log(data.id, data.name);
      } catch (e) {
        console.log(e); // 錯誤處理
      }
    });
}

function deleteBook(id) {
  request.delete(`${API_URL}/books/${id}`,
    (error) => {
      if (error) {
        console.log('刪除失敗', error);
        return;
      }
      console.log(`第 ${id} 本書已幫你刪除囉！`);
    });
}

function createBook(name) {
  request.post({
    url: `${API_URL}/books`,
    form: {
      name,
    },
  }, (error) => {
    if (error) {
      console.log('新增失敗', error);
      return;
    }
    console.log('幫你增加囉！');
    request(`${API_URL}/books`,
      (_err, _res, body) => {
        let data;
        try {
          data = JSON.parse(body);
          const num = data.length - 1;
          console.log(data[num].id, data[num].name);
        } catch (e) {
          console.log(e); // 錯誤處理
        }
      });
  });
}

function updateBook(id) {
  request.patch({
    url: `${API_URL}/books/${id}`,
    form: {
      name: process.argv[4],
    },
  },
  (error) => {
    if (error) {
      console.log('更新失敗', error);
      return;
    }
    console.log('幫你改名囉！');
    readBook(id);
  });
}

switch (action) {
  case 'list':
    showBooks();
    break;
  case 'read':
    readBook(key);
    break;
  case 'delete':
    deleteBook(key);
    break;
  case 'create':
    createBook(key);
    break;
  case 'update':
    updateBook(key);
    break;
  default:
    console.log('請輸入有效指令');
}
