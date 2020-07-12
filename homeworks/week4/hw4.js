const request = require('request');

const API_URL = 'https://api.twitch.tv/kraken';

request({
  url: `${API_URL}/games/top`,
  headers: {
    Accept: 'application/vnd.twitchtv.v5+json',
    'Client-ID': 'wn8pirkwzemy6ouh1xhj2m7ccym946',
  },
}, (err, httpResponse, body) => {
  let data;
  try {
    data = JSON.parse(body);
    for (let i = 0; i < data.top.length; i += 1) {
      console.log(data.top[i].viewers, data.top[i].game.name);
    }
  } catch (e) {
    console.log(e); // 錯誤處理
  }
});
