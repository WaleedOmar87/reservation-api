const { DataTypes } = require("sequelize");
import database from "@/utils/database";

import { Reservation, Review } from "@/models/index";
const Customer = database.define("Customer", {
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
		type: DataTypes.INTEGER,
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
		type: DataTypes.INTEGER,
		allowNull: false,
		unique: true,
	},
	age: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	passwordResetKey: {
		type: DataTypes.STRING,
		allowNull: true,
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

export default Customer;
