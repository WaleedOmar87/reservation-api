require("dotenv").config();
const seq = require("sequelize");
const database = new seq(
	process.env.DATABASE_NAME,
	process.env.DATABASE_USERNAME,
	process.env.DATABASE_PASSWORD,
	{
		dialect: "postgres",
		host: "localhost",
	}
);

module.exports = database;
