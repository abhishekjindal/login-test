const express = require('express');
const router = express.Router();
const pg = require('pg');
const path = require('path');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/todo';


router.get('/', function(req, res, next) {
	res.send("you are accessing home auth")
})

router.get('/registersuccess', function(req, res, next) {
	res.send("successfully signed up");
})

router.post('/register', function(req, res, next) {
	const email = req.body.email;
	const password = req.body.password;
	
	pg.connect(connectionString, (err, client, done) => {
    	// Handle connection errors
	    if(err) {
	      done();
	      console.log(err);
	      return res.status(500).json({success: false, data: err});
	    }

	
    // SQL Query > Insert Data
    	client.query('INSERT INTO login(email, password) values($1, $2)',[email, password]);

	    res.writeHead(301,{
			"Location" : "registersuccess"
		});
		res.end();

  	});
});

// router.get('/loginsuccess', function(req, res, next) {
// 	res.send("successfully logged up");
// })

router.post('/login', function(req, res, next) {
	const email = req.body.email;
	const password = req.body.password;
	const results = [];
	
	pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
	    if(err) {
	      done();
	      console.log(err);
	      return res.status(500).json({success: false, data: err});
	    }

	// console.log(client.query('SELECT * FROM login WHERE email=$1',[email]));
 
    	client.query('SELECT * FROM login WHERE email=$1',[email]);/*, function(err, rows){
    	if(err){
    		console.log(err);
    		res.send(err);
    	}else{
    		res.json(rows);
    	}

    });*/

 //    res.writeHead(301,{
	// 	"Location" : "registersuccess"
	// });
	// res.end();

	query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      return res.json(results);
    });

  });
});

module.exports = router;