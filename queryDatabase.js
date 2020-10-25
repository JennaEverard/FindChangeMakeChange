

const mysql = require('mysql');

function queryForSen() {
	const host = "localhost";
	const user = "root";
	const pass = "dbuserdbuser";
	const database = "currentcongress";

	// connect to database
	const sqlconnection = mysql.createConnection({
		host: host,
		user: user,
		password: pass,
		database: database,
	});
	sqlconnection.connect(function(error) {
		if(error)
		{
			console.log("Unable to Connect!");
			throw error;
		}
		console.log("Successfully Connected to " + database);
	});

	// query for data
	var results;
	let sql_temp_query = "SELECT * FROM congress WHERE state=? AND type='sen'";
	sqlconnection.query(sql_temp_query, "WA", function(error, result) {
		if(error)
			console.log("Error In Query: " + error);
		results = result;
		console.log(result);
	});
	
	// close connection
	sqlconnection.end(function(error) {
		if(error)
			console.log("Could Not End Connection: " + error);
		console.log("Connection Closed");
	});
	
}
