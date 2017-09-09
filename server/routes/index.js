var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index');
  next()
});
router.use('/users', require('./users'))
router.use('/goods', require('./goods'))
module.exports = router;
