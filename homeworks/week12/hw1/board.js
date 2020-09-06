/* eslint-disable no-restricted-syntax */
/* eslint-disable no-alert */
/* eslint-disable no-undef */
// 時間格式 yyyy-mm-dd hh:mm:ss
function getTime() {
  const now = new Date();
  const year = now.getFullYear(); // yyyy
  const month = now.getMonth() + 1; // mm
  const day = now.getDate(); // dd
  const hh = now.getHours(); // hh
  const mm = now.getMinutes(); // mm
  const ss = now.getSeconds(); // ss
  let clock = `${year}-`;
  if (month < 10) { clock += '0'; }
  clock += `${month}-`;
  if (day < 10) { clock += '0'; }
  clock += `${day} `;
  if (hh < 10) { clock += '0'; }
  clock += `${hh}:`;
  if (mm < 10) { clock += '0'; }
  clock += `${mm}:`;
  if (ss < 10) { clock += '0'; }
  clock += ss;
  return clock;
}

function escape(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

function appendCommentToDom(container, comment, isPrepend) {
  const html = `
    <div class="col-12 board-list-group">
      <div class="row board-list-group-item d-flex justify-content-between align-items-start pb-3 pt-3">
        <div class="col-md-8 col-12 pb-2 d-flex align-items-center board-list-name">
          <span class="badge mr-2">訪客</span>${escape(comment.nickname)}
        </div>
        <div class="board-list-date col-md-4 col-12 text-right pb-2">
          ${comment.created_at}
        </div>
        <div class="col-12 board-list-message">
          ${escape(comment.content)}
        </div>
      </div>
    </div>
  `;
  if (isPrepend) {
    container.prepend(html);
  } else {
    container.append(html);
  }
}

const limit = 5;

function getCommentsAPI(siteKey, before, cb) {
  let url = `http://localhost:8080/api_board/api_comments.php?site_key=${siteKey}&limit=${limit}`;
  if (before) {
    url += `&before=${before}`;
  }
  $.ajax({
    url,
  }).done((data) => {
    cb(data);
  });
}

const siteKey = '12345';
const loadMoreBtnHTML = `
  <div class="board-footer-more col-md-2 col-sm-3 col-12">
    載入更多 <i class="fas fa-arrow-circle-down"></i>
  </div>
`;
let lastId = null;
let isEnd = false;
const commentDom = $('.board-list');

function getComments() {
  $('.board-footer-more').hide();
  if (isEnd) {
    return;
  }
  getCommentsAPI(siteKey, lastId, (data) => {
    if (!data.ok) {
      alert(data.message);
      return;
    }
    const comments = data.discussions;
    for (const comment of comments) {
      appendCommentToDom(commentDom, comment);
    }
    const { length } = comments;
    if (length < limit) {
      isEnd = true;
      $('.board-footer-more').hide();
    } else {
      lastId = comments[length - 1].id;
      $('.board-footer').append(loadMoreBtnHTML);
    }
  });
}

$(document).ready(() => {
  getComments();
  $('.board-footer').on('click', '.board-footer-more', () => {
    getComments();
  });
  $('.board-form').submit((e) => {
    console.log(getTime());
    e.preventDefault();
    const newCommentData = {
      site_key: '12345',
      nickname: $('input[name=nickname]').val(),
      content: $('textarea[name=content]').val(),
      created_at: getTime(),
    };
    $.ajax({
      type: 'POST',
      url: 'http://localhost:8080/api_board/api_add_comments.php',
      data: newCommentData,
      success: (resp) => {
        if (!resp.ok) {
          $('.alert').fadeIn();
          return;
        }
        $('input[name=nickname]').val('');
        $('textarea[name=content]').val('');

        appendCommentToDom(commentDom, newCommentData, true);
      },
    });
  });
});
