/* eslint-disable no-restricted-syntax */
/* eslint-disable no-use-before-define */
/* eslint-disable prefer-destructuring */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
import $ from 'jquery';
import css from './board.sass';
import {
  loadMoreBtnHTML,
  getForm,
} from './templetes';
import {
  getTime,
  appendCommentToDom,
} from './utils';
import {
  getComments,
  addComments,
} from './api';

export function init(options) {
  let siteKey = '';
  let apiUrl = '';
  let containerElement = null;
  let lastId = null;
  let isEnd = false;
  let commentDom = null;
  let limit = '';
  let board = null;

  siteKey = options.siteKey;
  apiUrl = options.apiUrl;
  containerElement = $(options.containerSelector);
  const formTemplate = getForm(siteKey);
  containerElement.append(formTemplate);
  limit = options.limit;
  board = $(`.${siteKey}`);
  commentDom = board.find('.board-list');

  getNewComments();

  board.find('.board-footer').on('click', '.board-footer-more', () => {
    getNewComments();
  });
  board.find('.board-form').submit((e) => {
    e.preventDefault();
    const newCommentData = {
      site_key: siteKey,
      nickname: board.find('input[name=nickname]').val(),
      content: board.find('textarea[name=content]').val(),
      created_at: getTime(),
    };
    addComments(apiUrl, newCommentData, (data) => {
      if (!data.ok) {
        board.find('.alert').fadeIn();
        return;
      }
      board.find('input[name=nickname]').val('');
      board.find('textarea[name=content]').val('');
      board.find('.alert').fadeOut();
      appendCommentToDom(commentDom, newCommentData, true);
    });
  });

  function getNewComments() {
    board.find('.board-footer-more').hide();
    if (isEnd) {
      return;
    }
    getComments(apiUrl, siteKey, lastId, limit, (data) => {
      if (!data.ok) {
        alert(data.message);
        return;
      }
      const comments = data.discussions;
      for (const comment of comments) {
        appendCommentToDom(commentDom, comment);
      }
      const {
        length,
      } = comments;
      if (length < limit) {
        isEnd = true;
        board.find('.board-footer-more').hide();
      } else {
        lastId = comments[length - 1].id;
        board.find('.board-footer').append(loadMoreBtnHTML);
      }
    });
  }
}
