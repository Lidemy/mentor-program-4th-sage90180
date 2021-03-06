/* eslint-disable no-use-before-define */
/* eslint-disable consistent-return */
const db = require('../models');

const { Prize } = db;
const { User } = db;
const prizeController = {
  handleAdd: (req, res, next) => {
    const { UserId } = req.session;
    const { prize } = req.body;
    const { title } = req.body;
    const { amount } = req.body;
    const { url } = req.body;

    if (!prize || !title || !amount || !url) {
      req.flash('errorMessage', '請填好，填滿！！');
      return next();
    }
    Prize.create({
      prize,
      title,
      amount,
      UserId,
      url,
    }).then(() => {
      req.flash('errorMessage', '新增成功！');
      return res.redirect('/admin');
    }).catch((err) => {
      req.flash('errorMessage', err.toString());
      return next();
    });
  },
  dispalyAdmin: (req, res) => {
    const { username } = req.session;
    if (!username) {
      req.flash('errorMessage', '請先登入。');
      return res.render('login');
    }
    Prize.findAll({
      include: User,
      where: {
        delete: null,
      },
    }).then((prizes) => {
      res.render('admin', {
        prizes,
      });
    });
  },
  dispalyIndex: (req, res) => {
    Prize.findAll({
      raw: true,
      include: User,
      where: {
        delete: null,
      },
    }).then((prizes) => {
      res.render('index', {
        prizes,
      });
    });
  },
  update: (req, res, next) => {
    const { prize } = req.body;
    const { title } = req.body;
    const { amount } = req.body;
    const { url } = req.body;
    if (!prize || !title || !amount || !url) {
      req.flash('errorMessage', '請填好，填滿！！');
      return next();
    }
    Prize.findOne({
      where: {
        id: req.params.id,
      },
    }).then(prizes => prizes.update({
      prize,
      title,
      amount,
      url,
    })).then(() => next()).catch((err) => {
      req.flash('errorMessage', err.toString());
      return next();
    });
  },
  delete: (req, res, next) => {
    const { username } = req.session;
    if (!username) {
      return next();
    }
    Prize.findOne({
      where: {
        id: req.params.id,
      },
    }).then((prizes) => {
      prizes.update({
        delete: '1',
      });
    }).then(() => {
      req.flash('errorMessage', '刪除成功！');
      return res.redirect('/admin');
    }).catch((err) => {
      req.flash('errorMessage', err.toString());
      return next();
    });
  },
  handlelottery: (req, res) => {
    Prize.findAll({
      raw: true,
      include: User,
      where: {
        delete: null,
      },
    }).then((prizes) => {
      const allPrize = prizes.length - 1; // 獎項
      const sumOfPrize = getSumOfPrize(prizes);// 所有獎項合
      
      var probability = prizes[0]['User.probability'];
      
      if(sumOfPrize > probability) {
        probability = sumOfPrize
      }
      
      const probabilityArr = GetProbabilityArr(probability);
      const yourNumber = Math.floor(Math.random() * probability);

      const allLuckyNumber = getAllLuckyNumber(sumOfPrize); // 中獎號
      const yourPrize = compareNumber(yourNumber); // 兌獎
      // 所有數字陣列
      function GetProbabilityArr(n) {
        const arr = [];
        for (let i = 0; i < n; i += 1) {
          arr.push(i);
        }
        return arr;
      }

      // 所有獎項總和
      function getSumOfPrize(arr) {
        let sum = 0;
        for (let i = 0; i < arr.length; i += 1) {
          sum += Number(arr[i].amount);
        }
        return sum;
      }


      // 抽獎囉~抽出所有中獎號碼
      function getAllLuckyNumber(n) {
        const arr = [];
        for (let i = 0; i <= n; i += 1) {
          const random = Math.floor(Math.random() * (probability - i));
          arr.push(probabilityArr[random]);
          probabilityArr.splice(random, 1);
        }
        return arr;
      }

      // // 每個獎項總和
      function getEachePrize(n) {
        let sum = 0;
        for (let i = 0; i < n; i += 1) {
          sum += Number(prizes[i + 1].amount);
        }
        return sum;
      }

      // 兌獎囉~
      function compareNumber(n) {
        const obj = {
          title: '',
          url: '',
        };
        const index = allLuckyNumber.indexOf(n);
        if (index === -1) {
          obj.title = prizes[0].title;
          obj.url = prizes[0].url;
          return obj;
        }
        for (let i = 1; i < allPrize; i += 1) {
          if (index < getEachePrize(i)) {
            obj.title = prizes[i].title;
            obj.url = prizes[i].url;
            return obj;
          }
        }
        obj.title = prizes[0].title;
        obj.url = prizes[0].url;
        return obj;
      }
      return res.render('lottery', {
        prizes,
        yourPrize,
      });
    });
  },
};

module.exports = prizeController;
