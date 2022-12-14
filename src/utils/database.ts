const dotenv = require("dotenv");
const { Sequelize } = require("sequelize");
dotenv.config();

const database = new Sequelize(
	process.env.DATABASE_NAME,
	process.env.DATABASE_USERNAME,
	process.env.DATABASE_PASSWORD,
	{
		dialect: "postgres",
		host: process.env.DATABASE_HOST,
	}
);

export default database;
