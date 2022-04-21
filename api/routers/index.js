var express = require('express');
var router = express.Router();
const authnMiddleWare = require('../middleware/auth.middleware').auth
/* GET home page. */
router.get('/' , function(req, res, next) {
  socket.emit("hello", "world");
  res.render('index', { title: 'Express' });
});

module.exports = router;
