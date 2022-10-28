const { DataTypes } = require("sequelize");
import database from "@/utils/database";

const Staff = database.define("Staff", {
	staff_uid: {
		type: DataTypes.UUID,
		allowNull: false,
		primaryKey: true,
		defaultValue: DataTypes.UUIDV4,
		unique: true,
	},
	staff_name: {
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
	password: {
		type: DataTypes.STRING ,
		allowNull: false
	},
	passwordResetKey: {
		type: DataTypes.string ,
		allowNull: true
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

export default Staff;
