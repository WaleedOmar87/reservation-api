const { DataTypes } = require("sequelize");
import database from "@/utils/database";
const bcrypt = require("bcryptjs");

const Owner = database.define(
	"Owner",
	{
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
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		emailValidationKey: {
			type: DataTypes.STRING,
			allowNull: true,
			unique: true,
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
		hooks: {
			// update password on create and save actions
			beforeCreate: async (owner: { password?: string }) => {
				if (owner.password) {
					const salt = await bcrypt.genSalt(10, "a");
					owner.password = bcrypt.hashSync(owner.password, salt);
				}
			},
			beforeUpdate: async (owner: { password?: string }) => {
				if (owner.password) {
					const salt = await bcrypt.genSalt(10, "a");
					owner.password = bcrypt.hashSync(owner.password, salt);
				}
			},
		},
	}
);

export default Owner;
