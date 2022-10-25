const { DataTypes } = require("sequelize");
const Sequelize = require("database/database");
import { Restaurant } from "./";

const Owner = Sequelize.define("Owner", {
	owner_uid: {
		type: DataTypes.UUID,
		allowNull: false,
		primaryKey: true,
		defaultValue: DataTypes.UUIDV4,
		unique: true,
	},
	owner_name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	owner_address: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	phone_number: {
		type: DataTypes.INTEGER,
		allowNull: false,
		unique: true,
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

Owner.hasMany(Restaurant);

export default Owner;
