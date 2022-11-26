const { DataTypes } = require("sequelize");
import database from "@/utils/database";
export const Review = database.define("Review", {
	review_uid: {
		type: DataTypes.UUID,
		unique: true,
		allowNull: false,
		primaryKey: true,
		defaultValue: DataTypes.UUIDV4,
	},
	food_rating: {
		type: DataTypes.INTEGER,
		allowNull: {
			arg: false,
			msg: "Rating Is Required",
		},
		validate: {
			min: 1,
			max: 5,
		},
	},
	service_rating: {
		type: DataTypes.INTEGER,
		allowNull: {
			arg: false,
			msg: "Service Rating Is Required",
		},
		validate: {
			min: 1,
			max: 5,
		},
	},
	ambience_rating: {
		type: DataTypes.INTEGER,
		allowNull: {
			arg: false,
			msg: "Ambience Rating Is Required",
		},
		validate: {
			min: 1,
			max: 5,
		},
	},
	value_rating: {
		type: DataTypes.INTEGER,
		allowNull: {
			arg: false,
			msg: "Value Rating Is Required",
		},
		validate: {
			min: 1,
			max: 5,
		},
	},
	comment: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	date: {
		type: DataTypes.DATE,
		allowNull: {
			arg: false,
			msg: "Comment Date Is Missing",
		},
	},
});
