const element = document.querySelector('.faq_content');
element.addEventListener('click', (e) => {
  if (e.target.classList.contains('card_header')) {
    e.target.lastElementChild.classList.toggle('open');
    e.target.nextElementSibling.classList.toggle('display');
  }
  if (e.target.parentNode.classList.contains('card_header')) {
    e.target.parentNode.querySelector('.open_card_btn').classList.toggle('open');
    e.target.offsetParent.nextElementSibling.classList.toggle('display');
  }
});
