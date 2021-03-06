/* eslint-disable consistent-return */
const db = require('../models');

const { User } = db;
const userController = {
  login: (req, res) => {
    res.render('login');
  },
  logout: (req, res) => {
    req.session.username = null;
    res.redirect('/login');
  },
  handleLogin: (req, res, next) => {
    const {
      username,
      password,
    } = req.body;
    if (!username || !password) {
      req.flash('errorMessage', '請填好，填滿！！');
      return next();
    }
    User.findOne({
      where: {
        username,
        password,
      },
    }).then((user) => {
      if (!user) {
        req.flash('errorMessage', '帳號/密碼錯誤喔！');
        return next();
      }
      req.session.username = user.username;
      req.session.UserId = user.id;
      console.log(user.id);
      res.redirect('/admin');
    }).catch((err) => {
      req.flash('errorMessage', err.toString());
      return next();
    });
  },
  updateProbability: (req, res, next) => {
    const { probability } = req.body;
    if (!probability) {
      req.flash('errorMessage', '請填好，填滿！！');
      return next();
    }
    User.findOne(
    ).then(user => user.update({
      probability,
    })).then(() => next()).catch((err) => {
      req.flash('errorMessage', err.toString());
      return next();
    });
  },
};

module.exports = userController;
