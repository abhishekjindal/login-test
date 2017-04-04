const express = require('express');
const router = express.Router();
const pg = require('pg');
const path = require('path');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/todo';

client = {};
pg.connect(connectionString, (err, thisclient, done) => {
	client = thisclient;
})

router.get('/', function(req, res, next) {
	res.send("you are accessing home auth")
})

router.get('/registersuccess', function(req, res, next) {
	res.send("successfully signed up");
});

router.post('/register', function(req, res, next) {
	const email = req.body.email;
	const password = req.body.password;
    // SQL Query > Insert Data
	client.query('INSERT INTO login(email, password) values($1, $2);',[email, password]);
	// Response
    res.writeHead(301,{
		"Location" : "registersuccess"
	});
	res.end();
});

router.get('/loginsuccess', function(req, res, next) {
	res.send("successfully logged in");
});

router.post('/login', function(req, res, next) {
	const email = req.body.email;
	const password = req.body.password;
	const results = [];
	var loginsuccess = false;
	 
    query = client.query('SELECT * FROM login where email=\''+email+'\';');

    query.on('row', (row) => {
    	if(password == row.password){
    		loginsuccess = true;
    	}else{
    		res.send("password does not match");
    	}
    });
    

    query.on('end', () => {
    	if (!loginsuccess) {
      		res.send("username does not exist");
      	}else{
      		res.writeHead(301,{
				"Location" : "loginsuccess"
			});
			res.end();
      	}
    });

});

module.exports = router;