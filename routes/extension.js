var express = require('express');
var router = express.Router();

/* GET extension page. */
router.get('/', function(req, res, next) {
  res.render('extension', { title: 'Extension' });
});

module.exports = router;
