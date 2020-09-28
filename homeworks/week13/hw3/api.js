/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-restricted-syntax */
/* eslint-disable arrow-body-style */
/* eslint-disable no-sequences */
/* eslint-disable no-use-before-define */
const topGameUrl = 'https://api.twitch.tv/kraken/games/top?limit=5';
const channelUrl = 'https://api.twitch.tv/kraken/streams/?limit=24&game=';
const id = 'wn8pirkwzemy6ouh1xhj2m7ccym946';
const headers = new Headers({
  Accept: 'application/vnd.twitchtv.v5+json',
  'Client-ID': id,
});
let pageOffset = 0;
let topGames = null;

fetch(topGameUrl, {
  method: 'get',
  headers,
})
  .then(res => res.json())
  .then((data) => {
    topGames = data.top;
    displayGameName(topGames);
    displayGameChannel(topGames[0].game.name);
  }).catch((err) => {
    return 'err', err;
  });


// 顯示前五名
function displayGameName(games) {
  const gameLink = document.querySelectorAll('.nav-link');
  for (let i = 0; i < gameLink.length; i += 1) {
    gameLink[i].innerText = games[i].game.name;
  }
}

// 顯示各頻道
function displayGameChannel(game) {
  document.querySelector('.gamename').innerText = game;
  fetch(`${channelUrl}${game}&offset=${pageOffset}`, {
    method: 'get',
    headers,
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      const channels = data.streams;
      for (ch of channels) {
        const thumbnail = ch.preview.large;
        const { logo } = ch.channel;
        const { status } = ch.channel;
        const { name } = ch.channel;
        const { viewers } = ch;
        const { url } = ch.channel;
        const div = document.createElement('div');
        div.classList.add('channel__card');
        div.classList.add('col-xl-4');
        div.classList.add('col-md-6');
        const template = `
        <div class="channel__thumbnail">
          <i class="far fa-eye channel__views"> ${viewers}</i>
          <a href="${url}">
            <img src="${thumbnail}" alt="">
          </a>
        </div>
        <div class="channel__info p-2 py-3 d-flex">
          <img class="channel__photo mr-2" src="${logo}" alt="">
          <div class="channel__text">
            <h5 class="channel__title">${status}</h5>
            <a class="channel__name" href="${url}">${name}</a>
          </div>
          <div class="channel__hover"></div>
        </div>
        `;
        div.innerHTML = template;
        document.querySelector('.channel__cards').appendChild(div);
      }
    });
}

// 點選頁面
document.querySelector('.navbar').addEventListener('click', (e) => {
  const links = [];
  pageOffset = 0;
  for (const game of topGames) {
    links.push(game.game.name);
  }
  const number = links.indexOf(e.target.innerText);
  if (e.target.classList.contains('nav-link')) {
    document.querySelector('.channel__gamename-no').innerText = number + 1;
    document.querySelector('.channel__cards').innerHTML = '';
    displayGameChannel(e.target.innerText);
  }
});

// 載入更多
document.querySelector('.load__more').addEventListener('click', (e) => {
  const gamename = document.querySelector('.gamename').innerText;
  displayGameChannel(gamename);
  pageOffset += 24;
});
