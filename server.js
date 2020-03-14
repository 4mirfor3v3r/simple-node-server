const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./mysql.js');
const port = process.env.PORT || 5000;
let runningMessage = 'Server is running on port ' + port;

app.get('/', (req, res) => {
  console.log('API was successfully requested');
  res.send(runningMessage);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/Pusair/users/auth', (req, res) => {
	var email = req.body.email;
	var password = req.body.password;
	if (email && password) {
		db.query(`SELECT * FROM users WHERE email = ? AND password = ?`, [email, password], function(err, rows) {
			if (err) throw err;
			else if (rows.length >> 0) {
				res.send(rows);
			} else {
				res.send(rows);
			}
		});
	} else {
		res.json({ error: 'Harap isi semua bidang' });
	}
});
app.post('/Pusair/users/add', (req, res) => {
	var userData = {
		id: null,
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
		location: req.body.location,
		level: 0,
	};
	if (userData.name != null && userData.email != null && userData.password != null && userData.location != null) {
		db.query(`SELECT * FROM users WHERE email = ? `, userData.email, function(err, rows) {
			if (err) throw err;
			else if (!rows.length >> 0) {
				db.query(`INSERT INTO users SET ?`, userData, function(err, resulted) {
					if (err) {
						res.json({ error: 'Error' });
					} else {
						res.send(resulted);
					}
				});
			} else {
				res.json({ error: 'Data Sudah Ada.' });
			}
		});
	} else {
		res.json({ error: 'Harap isi semua bidang' });
	}
});

app.get('/Pusair/sedot', (req, res) => {
	var sql = `SELECT * FROM sedot ORDER BY id DESC LIMIT 100`;
	db.query(sql, (err, rows) => {
		if (err) throw err;
		else {
			res.send(rows);
		}
	});
});
app.post('/Pusair/sedot', (req, res) => {
	var data = {
		id: null,
		debit: req.body.debit,
		tall: req.body.tall,
		waterpump: req.body.waterpump,
	};
	if (data.debit != null && data.tall != null && data.waterpump != null) {
		db.query(`INSERT INTO sedot SET ?`, data, function(err, resulted) {
			if (err) throw err;
			else {
				res.send(resulted);
			}
		});
	}
});
app.get('/Pusair/sedot/:size', (req, res) => {
	var size = req.params.size;
	var sql = `SELECT * FROM sedot ORDER BY id DESC LIMIT ${size}`;
	db.query(sql, (err, rows) => {
		if (err) throw err;
		else {
			res.send(rows);
		}
	});
});

app.get('/Pusair/sanitasi', (req, res) => {
	var sql = `SELECT * FROM sanitasi ORDER BY id DESC LIMIT 100`;
	db.query(sql, (err, rows) => {
		if (err) throw err;
		else {
			res.send(rows);
		}
	});
});
app.post('/Pusair/sanitasi', (req, res) => {
	var data = {
		id: null,
		ph: req.body.ph,
		tall: req.body.tall,
	};
	if (data.ph != null && data.tall != null) {
		db.query(`INSERT INTO sanitasi SET ?`, data, function(err, resulted) {
			if (err) throw err;
			else {
				res.send(resulted);
			}
		});
	}
});
app.get('/Pusair/sanitasi/:size', (req, res) => {
	var size = req.params.size;
	var sql = `SELECT * FROM sanitasi ORDER BY id DESC LIMIT ${size}`;
	db.query(sql, (err, rows) => {
		if (err) throw err;
		else {
			res.send(rows);
		}
	});
});



const server = app.listen(port, () => {
  console.log(runningMessage);
});

module.exports = server;
