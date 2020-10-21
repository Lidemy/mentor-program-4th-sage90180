/* eslint-disable consistent-return */
const db = require('../models');

const { Article } = db;
const { User } = db;
const articleController = {
  add: (req, res) => {
    res.render('edit');
  },
  delete: (req, res, next) => {
    const { username } = req.session;
    if (!username) {
      return next();
    }
    Article.findOne({
      where: {
        id: req.params.id,
        UserId: req.session.UserId,
      },
    }).then(article => article.destroy()).then(() => next()).catch(() => next());
  },
  handleAdd: (req, res, next) => {
    const { username } = req.session;
    const { UserId } = req.session;
    const { content } = req.body;
    const { title } = req.body;
    if (!username || !UserId) {
      req.flash('errorMessage', '請先登入。');
      return next();
    }
    if (!content || !title) {
      req.flash('errorMessage', '請填好，填滿！！');
      return next();
    }
    Article.create({
      content,
      title,
      UserId,
    }).then(() => {
      res.redirect('/');
    }).catch((err) => {
      req.flash('errorMessage', err.toString());
      return next();
    });
  },
  index: (req, res) => {
    Article.findAll({
      include: User,
    }).then((articles) => {
      res.render('index', {
        articles,
      });
    });
  },
  getList: (req, res) => {
    Article.findAll({
      include: User,
    }).then((articles) => {
      res.render('article-list', {
        articles,
      });
    });
  },
  getArticle: (req, res) => {
    Article.findOne({
      where: {
        id: req.params.id,
      },
    }).then((article) => {
      res.render('article', {
        article,
      });
    });
  },
  update: (req, res) => {
    Article.findOne({
      where: {
        id: req.params.id,
      },
    }).then((article) => {
      res.render('update', {
        article,
      });
    });
  },
  handleUpdate: (req, res, next) => {
    const { username } = req.session;
    const { UserId } = req.session;
    const { content } = req.body;
    const { title } = req.body;
    if (!username || !UserId) {
      req.flash('errorMessage', '先登入，休想亂改！！');
      return next();
    }
    if (!content || !title) {
      req.flash('errorMessage', '請填好，填滿！！');
      return next();
    }
    Article.findOne({
      where: {
        id: req.params.id,
        UserId: req.session.UserId,
      },
    }).then(article => article.update({
      content: req.body.content,
      title: req.body.title,
    })).then(() => {
      res.redirect('back');
    }).catch((err) => {
      req.flash('errorMessage', err.toString());
      return next();
    });
  },
};

module.exports = articleController;
