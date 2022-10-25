const { DataTypes } = require("sequelize");
const Sequelize = require("database/database");
const Customer = require("src/models/customer");

const Review = Sequelize.define("Review", {
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

Review.belongsTo(Customer, { constrains: true });

module.exports = Review;
