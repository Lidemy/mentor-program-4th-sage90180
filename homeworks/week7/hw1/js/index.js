/* eslint-disable no-undef */
const element = document.querySelector('.form_main');
const input = document.querySelectorAll('input');
const radio = document.querySelectorAll('input[type=radio]');
element.addEventListener('submit', (e) => {
  let setAlert = true;
  let radioValue = '';
  // 確認 input 輸入
  for (let i = 0; i < input.length; i += 1) {
    if (input[i].value === '') {
      input[i].nextElementSibling.style.opacity = '1';
      setAlert = false;
    }
    e.preventDefault();
  }

  // radio 確認
  if (getRadioNum() > -1) {
    radioValue = radio[getRadioNum()].value;
  } else {
    setAlert = false;
    document.querySelector('.opt').style.opacity = '1';
    e.preventDefault();
  }

  if (setAlert) {
    // eslint-disable-next-line no-alert
    alert(`----------資 料 送 出----------
暱       稱：${document.querySelector('input[name=name]').value}
信       箱：${document.querySelector('input[name=email]').value}
手       機：${document.querySelector('input[name=phone]').value}
報名項目：${radioValue}
資訊來源：${document.querySelector('input[name=howKnow]').value}
其       它：${document.querySelector('textarea').value}
------------------------------
  `);
  }
});
// 確認 radio 是否有勾選
getRadioNum = () => {
  for (let i = 0; i < radio.length; i += 1) {
    if (radio[i].checked) {
      return i;
    }
  }
  return -1;
};
