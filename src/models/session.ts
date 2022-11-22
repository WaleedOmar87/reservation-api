const { DataTypes, Deferrable } = require("sequelize");
import database from "@/utils/database";
import { User } from "@/models/index";

export const Session = database.define("Session", {
	session_uid: {
		type: DataTypes.UUID,
		unique: true,
		allowNull: false,
		primaryKey: true,
		defaultValue: DataTypes.UUIDV4,
	},
	user: {
		type: DataTypes.UUID,
		references: {
			model: User,
			key: "user_uid",
			deferrable: Deferrable.INITIALLY_IMMEDIATE,
		},
	},
});
