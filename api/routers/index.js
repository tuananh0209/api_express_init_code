var express = require('express');
var router = express.Router();
const authnMiddleWare = require('../middleware/auth.middleware').auth
/* GET home page. */
router.get('/', authnMiddleWare , function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
