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
        console.log(data);
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

document.querySelector('.lottery_btn').addEventListener('click', () => {
  draw((err, data) => {
    if (err) {
      alert(err);
      return;
    }
    switch (data.prize) {
      case 'FIRST':
        lotterySection.style.backgroundImage = 'url(./imgs/first.png)';
        lotterySection.innerHTML = `
        <div class="prizeInfo">
          <h1>恭喜你中頭獎了！日本東京來回雙人遊！</h1>
          <div class="lottery_btn" onclick='javascript:window.location.reload()'>再抽一次</div>
        </div>`;
        lotterySection.style.backgroundSize = '100% auto';
        break;
      case 'SECOND':
        lotterySection.style.backgroundImage = 'url(./imgs/second.png)';
        lotterySection.innerHTML = `
        <div class="prizeInfo">
          <h1>二獎！90 吋電視一台！</h1>
          <div class="lottery_btn" onclick='javascript:window.location.reload()'>再抽一次</div>
        </div>`;
        lotterySection.style.backgroundSize = '100% auto';
        break;
      case 'THIRD':
        lotterySection.style.backgroundImage = 'url(./imgs/third.png)';
        lotterySection.innerHTML = `
        <div class="prizeInfo">
          <h1>恭喜你抽中三獎：知名 YouTuber 簽名握手會入場券一張，bang！</h1>
          <div class="lottery_btn" onclick='javascript:window.location.reload()'>再抽一次</div>
        </div>`;
        lotterySection.style.backgroundSize = '100% auto';
        break;
      case 'NONE':
        lotterySection.style.background = 'black';
        lotterySection.style.color = 'white';
        lotterySection.innerHTML = `
        <div class="prizeInfo">
          <h1>銘謝惠顧</h1> 
          <div class="lottery_btn" onclick='javascript:window.location.reload()'>再抽一次</div>
        </div>`;
        break;
      default:
        alert(errorMessage);
    }
  });
});
