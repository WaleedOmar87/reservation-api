const pg = require("pg");
const Pool = new pg({
	user: "waleedomar",
	password: "123456",
	port: 5432,
	host: "localhost",
	database: "reservation",
});

module.exports = Pool;
