const { DataTypes } = require("sequelize");
import database from "@/utils/database";
const bcrypt = require("bcryptjs");

export const User = database.define(
	"User",
	{
		user_uid: {
			type: DataTypes.UUID,
			allowNull: false,
			primaryKey: true,
			unique: true,
			defaultValue: DataTypes.UUIDV4,
		},
		user_name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		user_company: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		zip_code: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		user_role: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				is: /customer|owner|staff|admin/g,
			},
		},
		user_address: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		user_country: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		user_provenance: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		user_city: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		user_phone_number: {
			type: DataTypes.INTEGER,
			allowNull: false,
			unique: true,
		},
		user_age: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		user_email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		emailValidationKey: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: true,
		},
		user_password: {
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
		hooks: {
			// update password on create and save actions
			beforeCreate: async (customer: { password?: string }) => {
				if (customer.password) {
					const salt = await bcrypt.genSalt(10, "a");
					customer.password = bcrypt.hashSync(customer.password, salt);
				}
			},
			beforeUpdate: async (customer: { password?: string }) => {
				if (customer.password) {
					const salt = await bcrypt.genSalt(10, "a");
					customer.password = bcrypt.hashSync(customer.password, salt);
				}
			},
		},
		indexes: [
			{
				fields: ["user_uid", "user_email"],
				unique: true,
			},
			{
				fields: ["user_role"],
				unique: false,
			},
		],
	}
);
