const { DataTypes } = require("sequelize");
const Sequelize = require("database/database");
const Review = require("src/models/review");
const Reservation = require("src/models/reservation");

const Customer = Sequelize.define("Customer", {
	customer_uid: {
		type: DataTypes.UUID,
		allowNull: false,
		primaryKey: true,
		unique: true,
		defaultValue: DataTypes.UUIDV4,
	},
	customer_name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	customer_company: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	zip_code: {
		type: DataTypes.NUMBER,
		allowNull: false,
	},
	customer_address: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	country: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	provenance: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	city: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	phone_number: {
		type: DataTypes.NUMBEr,
		allowNull: false,
		unique: true,
	},
	age: {
		type: DataTypes.NUMBER,
		allowNull: false,
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	email_verified: {
		type: DataTypes.BOOLEAN,
		allowNull: true,
	},
	phone_verified: {
		type: DataTypes.BOOLEAN,
		allowNull: true,
	},
});

Customer.hasMany(Reservation);
Customer.hasMany(Review);

module.exports = Customer;
