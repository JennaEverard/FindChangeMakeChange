var express = require('express');
var router = express.Router();
const mysql = require('mysql');

function connectToDB() {
	const host = "localhost";
	const user = "root";
	const pass = "dbuserdbuser";
	const database = "currentcongress";

	// connect to database
	return mysql.createConnection({
		host: host,
		user: user,
		password: pass,
		database: database,
	});
}

function getState() {
	fetch()
}

/* GET senator listing. */
router.get('/', function(req, res, next) {
	console.log(req);
	console.log(req._parsedOriginalUrl.pathname.slice(-2));
	var allresults = [];
	var sqlconnection = connectToDB();
	sqlconnection.connect(function(error) {
		if(error)
		{
			console.log("Unable to Connect!");
			throw error;
		}
		console.log("Successfully Connected to ");
	});
	sqlconnection.query('SELECT * FROM congress WHERE Type=\"sen\" AND State=\"' + req._parsedOriginalUrl.pathname.slice(-2) + '\"', function(error, result2) {
		if(error)
			console.log("an error was encountered: " + error);
		else {
			
			for(var i=0; i<result2.length; i++) {
				var ret = {
					'name':result2[i].Name,
					'phone':result2[i].Phone,
					'contact':result2[i].Contact,
					'address':result2[i].Address
				}
				allresults.push(ret);
			}
		}
		console.log("allresults" + allresults[0].phone);
		res.render('action', { title: 'action', "senatorList":allresults });
	});
	sqlconnection.end(function(error) {
		if(error)
			console.log("Could Not End Connection: " + error);
		console.log("Connection Closed");
	});
});

module.exports = router;
