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

/* GET senator listing. */
router.get('/', function(req, res, next) {
	console.log(req);
	var inputcause = req._parsedOriginalUrl.pathname;
	var outputcause = "";
	if(inputcause.includes("Racial"))
		outputcause = "Racial Justice";
	else if(inputcause.includes("Climate"))
		outputcause = "Climate Change";
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
	sqlconnection.query('SELECT * FROM events WHERE cause=\"' + outputcause + '\" AND address like \"%New York%\"', function(error, result2) {
		if(error)
			console.log("an error was encountered: " + error);
		else {
			
			for(var i=0; i<result2.length; i++) {
				var ret = {
					'name':result2[i].name,
					'loc':result2[i].address,
					'date':result2[i].date,
					'description':result2[i].desc
				}
				allresults.push(ret);
			}
		}
		console.log("allresults" + allresults[0].phone);
		res.render('map', { title: 'Map', "eventInfo":allresults });
	});
	sqlconnection.end(function(error) {
		if(error)
			console.log("Could Not End Connection: " + error);
		console.log("Connection Closed");
	});
});

module.exports = router;
