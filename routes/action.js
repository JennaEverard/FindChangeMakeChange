var express = require('express');
var router = express.Router();

/* GET action page. */
router.get('/', function(req, res, next) {
  res.render('action', { title: 'Action' });
});

module.exports = router;
