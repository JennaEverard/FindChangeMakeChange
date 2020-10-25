//Requires
const logger = require('morgan');
const convertcsv = require('csvtojson');

const mysql = require('mysql');
const host = "localhost";
const user = "root";
const pass = "dbuserdbuser";
const database = "currentcongress";

// set up database
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
var congressdata = [];

let createTableQuery = `CREATE TABLE if not exists congress(Name varchar(244), 
												   Gender varchar(2), 
												   Type varchar(10), 
												   State varchar(10), 
												   District varchar(10), 
												   Class varchar(10), 
												   Party varchar(64), 
												   Address varchar(500), 
												   Phone varchar(32), 
												   Contact varchar(500))`;
										   
										   
sqlconnection.query(createTableQuery, function(error) {
	if (error)
		console.log("An Error Was Encountered: " + error);
});

convertcsv().fromFile("./public/data/congress-clip.csv").then(result => {
	congressdata = result;
	for(var i = 0; i < congressdata.length; i++) {
		
		var name = congressdata[i]["full_name"];
		var gender = congressdata[i]["gender"];
		var type = congressdata[i]["type"];
		var state = congressdata[i]["state"];
		var district = congressdata[i]["district"];
		var sen_class = congressdata[i]["senate_class"];
		var party = congressdata[i]["party"];
		var address = congressdata[i]["address"];
		var phone = congressdata[i]["phone"];
		var contact = congressdata[i]["contact_form"];
		
		
		
		sqlconnection.query("INSERT INTO congress values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [name, gender, type, state, district, sen_class, party, address, phone, contact], function(error) {
			if(error)
				console.log("An Error Was Encountered: " + error);
		});
	}
	
	congressdata = result;
	console.log(result)
});

/* close connection
	sqlconnection.end(function(error) {
		if(error)
			console.log("Could Not End Connection: " + error);
		console.log("Connection Closed");
	});*/