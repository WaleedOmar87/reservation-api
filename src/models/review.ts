const { DataTypes } = require("sequelize");
import database from "@/utils/database";
const Review = database.define("Review", {
	review_uid: {
		type: DataTypes.UUID,
		unique: true,
		allowNull: false,
		primaryKey: true,
		defaultValue: DataTypes.UUIDV4,
	},
	food_rating: {
		type: DataTypes.INTEGER,
		allowNull: false,
		validate: {
			min: 1,
			max: 5,
		},
	},
	service_rating: {
		type: DataTypes.INTEGER,
		allowNull: false,
		validate: {
			min: 1,
			max: 5,
		},
	},
	ambience_rating: {
		type: DataTypes.INTEGER,
		allowNull: false,
		validate: {
			min: 1,
			max: 5,
		},
	},
	value_rating: {
		type: DataTypes.INTEGER,
		allowNull: false,
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
		allowNull: false,
	},
});

export default Review;
