/* eslint-disable no-case-declarations */
/* eslint-disable no-alert */
const apiUrl = 'https://dvwhnbka7d.execute-api.us-east-1.amazonaws.com/default/lottery';
const errorMessage = '系統不穩定，請再試一次';
const lotterySection = document.querySelector('.lottery');

function draw(cb) {
  const request = new XMLHttpRequest();
  request.open('GET', apiUrl, true);
  request.onload = () => {
    if (request.status >= 200 && request.status < 400) {
      let data;
      try {
        data = JSON.parse(request.responseText);
      } catch (err) {
        cb(errorMessage);
        return;
      }
      if (!data.prize) {
        cb(errorMessage);
        return;
      }
      cb(null, data);
    } else {
      cb(errorMessage);
    }
  };
  request.onerror = () => {
    cb(errorMessage);
  };
  request.send();
}

function lotteryHtml(text) {
  lotterySection.innerHTML = `
  <div class="prizeInfo">
    <h1>${text}</h1>
    <div class="lottery_btn" onclick='javascript:window.location.reload()'>再試一次</div>
  </div>`;
  lotterySection.style.backgroundSize = '100% 100%';
}

document.querySelector('.lottery_btn').addEventListener('click', () => {
  draw((err, data) => {
    if (err) {
      alert(err);
      return;
    }
    switch (data.prize) {
      case 'FIRST':
        lotterySection.style.backgroundImage = 'url(./imgs/first.png)';
        const firstPrize = '恭喜你中頭獎了！日本東京來回雙人遊！';
        lotteryHtml(firstPrize);
        break;
      case 'SECOND':
        lotterySection.style.backgroundImage = 'url(./imgs/second.png)';
        const secPrize = '二獎！90 吋電視一台！';
        lotteryHtml(secPrize);
        break;
      case 'THIRD':
        lotterySection.style.backgroundImage = 'url(./imgs/third.png)';
        const thirdPrize = '恭喜你抽中三獎：知名 YouTuber 簽名握手會入場券一張，bang！';
        lotteryHtml(thirdPrize);
        break;
      case 'NONE':
        lotterySection.style.background = 'black';
        lotterySection.style.color = 'white';
        lotterySection.innerHTML = `
        <div class="prizeInfo">
          <h1>銘謝惠顧</h1> 
          <div class="lottery_btn" onclick='javascript:window.location.reload()'>再試一次</div>
        </div>`;
        break;
      default:
        alert(errorMessage);
    }
  });
});
