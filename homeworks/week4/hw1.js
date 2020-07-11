const request = require('request');

request('https://lidemy-book-store.herokuapp.com/books?_limit=10', (error, response, body) => {
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
