var express = require('express');
var router = express.Router();

/* GET map page. */
router.get('/', function(req, res, next) {
  res.render('map', { title: 'Map', "eventInfo":[{'name':"", 'loc':"", 'date':"", 'description':""}, {'name':"", 'loc':"", 'date':"", 'description':""}] });
});

module.exports = router;
