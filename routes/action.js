var express = require('express');
var router = express.Router();

/* GET action page. */
router.get('/', function(req, res, next) {
  res.render('action', { title: 'Action', "senatorList":[{'name':"Please Select A State", 'phone':"...", 'contact':"...", 'address':"..."}, {'name':"Please Select A State", 'phone':"...", 'contact':"...", 'address':"..."}] });
});

module.exports = router;

