/* eslint-disable no-restricted-syntax */
/* eslint-disable no-alert */
document.querySelector('form').addEventListener('submit', (e) => {
  const inputs = document.querySelectorAll('.necessary input');
  let getAlert = true;
  let radioValue = '';
  for (const input of inputs) {
    if (input.type === 'text') {
      if (!input.value) {
        input.nextElementSibling.style.opacity = '1';
        e.preventDefault();
        getAlert = false;
      }
    } else if (input.type === 'radio') {
      if (input.checked) {
        radioValue = input.value;
      }
    }
  }
  if (radioValue === '') {
    document.querySelector('.opt').style.opacity = '1';
    e.preventDefault();
    getAlert = false;
  }
  if (getAlert) {
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
