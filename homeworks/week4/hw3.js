const request = require('request');

const API_URL = 'https://restcountries.eu/rest/v2/name/';
const country = process.argv[2];

request(`${API_URL}${country}`, (error, response, body) => {
  if (response.statusCode >= 404 && response.statusCode < 500) {
    console.log(response.statusCode, '找不到國家資訊');
    return;
  }
  let data;
  try {
    data = JSON.parse(body);
    for (let i = 0; i < data.length; i += 1) {
      console.log('====================');
      console.log(`國家：${data[i].name}`);
      console.log(`首都：${data[i].capital}`);
      console.log(`貨幣：${data[i].currencies[0].code}`);
      console.log(`國碼：${data[i].callingCodes}`);
    }
  } catch (e) {
    console.log(e); // 錯誤處理
  }
});
