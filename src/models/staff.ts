const { DataTypes } = require("sequelize");
const bcrypt = require('bcryptjs')
import database from "@/utils/database";

const Staff = database.define(
	"Staff",
	{
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
		role: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				is: /admin|editor/g,
			},
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
	},
	{
		// update password on create and save actions
		beforeCreate: async (staff: { password?: string }) => {
			if (staff.password) {
				const salt = await bcrypt.genSalt(10, "a");
				staff.password = bcrypt.hashSync(staff.password, salt);
			}
		},
		beforeUpdate: async (staff: { password?: string }) => {
			if (staff.password) {
				const salt = await bcrypt.genSalt(10, "a");
				staff.password = bcrypt.hashSync(staff.password, salt);
			}
		},
	}
);

export default Staff;
