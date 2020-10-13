/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
const bcrypt = require('bcrypt');

const saltRounds = 10;
const db = require('../models');

const { User } = db;
const userController = {
  login: (req, res) => {
    res.render('login');
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
      },
    }).then((user) => {
      if (!user) {
        req.flash('errorMessage', '帳號/密碼錯誤喔！');
        return next();
      }
      bcrypt.compare(password, user.password, (err, isSuccess) => {
        if (err || !isSuccess) {
          req.flash('errorMessage', '帳號/密碼錯誤喔！');
          return next();
        }
        req.session.username = user.username;
        req.session.UserId = user.id;
        res.redirect('/');
      });
    }).catch((err) => {
      req.flash('errorMessage', err.toString());
      return next();
    });
  },
  logout: (req, res) => {
    req.session.username = null;
    res.redirect('/login');
  },

  register: (req, res) => {
    res.render('register');
  },

  handleRegister: (req, res, next) => {
    req.flash('errorMessage', '暫停註冊功能');
    return next();
    // const {
    //   username,
    //   password,
    //   nickname
    // } = req.body
    // if (!username || !password || !nickname) {
    //   req.flash('errorMessage', '請填好，填滿！！')
    //   return next()
    // }

    // bcrypt.hash(password, saltRounds, function (err, hash) {
    //   if (err) {
    //     req.flash('errorMessage', err.toString())
    //     return next()
    //   }
    //   User.create({
    //     username,
    //     nickname,
    //     password: hash
    //   }).then(()=>{
    //     req.session.username = username
    //     res.redirect('/')
    //   }).catch(err=>{
    //     req.flash('errorMessage', err.toString())
    //     return next()
    //   })
    // })
  },
};

module.exports = userController;
