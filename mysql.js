const mysql = require('mysql');

var config = {
	host: 'pusair-2020-db.mysql.database.azure.com',
	user: 'amierfor3v3r@pusair-2020-db',
	password: 'K3yGgenKey',
	database: 'db_pusair',
	port: 3306,
	ssl: true,
};

const db = new mysql.createConnection(config);

function initQuery() {
	db.query('DROP TABLE IF EXISTS users;', function(err, results, fields) {
		if (err) throw err;
		console.log('Dropped Users table if existed.');
	});

	db.query(
		'CREATE TABLE users (id INTEGER(4) PRIMARY KEY AUTO_INCREMENT, name VARCHAR(255), email VARCHAR(255), password VARCHAR(255), location VARCHAR(255), level INTEGER(3));',
		function(err, results, fields) {
			if (err) throw err;
			console.log('Created USERS table.');
		}
	);
}

db.connect(e => {
	if (e) {
		throw e;
	} else {
		console.log('DB connected');
		initQuery();
	}
});
module.exports = db;
