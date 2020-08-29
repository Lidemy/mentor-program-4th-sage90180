window.addEventListener('click', (e) => {
  // 正反切換
  if (e.target.classList.contains('fa-sign-out-alt')) {
    document.querySelector('.card_inner').classList.toggle('back');
  }
  if (e.target.classList.contains('fa-sign-in-alt')) {
    document.querySelector('.card_inner').classList.toggle('back');
  }
  if (e.target.classList.contains('fa-user-astronaut')) {
    document.querySelector('.card_inner').classList.toggle('back');
  }
  if (e.target.classList.contains('fa-reply')) {
    document.querySelector('.card_inner').classList.toggle('back');
  }
  // 編輯暱稱
  if (e.target.classList.contains('fa-pencil-alt')) {
    document.querySelector('.edit_nickname_area').classList.toggle('edit_hidden');
    document.querySelector('.comment_form').classList.toggle('opacity');
    document.querySelector('.edit_nickname_btn').classList.toggle('hidden');
  }
  if (e.target.classList.contains('fa-arrow-circle-right')) {
    document.querySelector('.edit_nickname_area').classList.toggle('edit_hidden');
    document.querySelector('.comment_form').classList.toggle('opacity');
    document.querySelector('.edit_nickname_btn').classList.toggle('hidden');
  }
});
