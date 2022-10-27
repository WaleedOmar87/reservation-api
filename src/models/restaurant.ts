const { DataTypes } = require("sequelize");
import database from "@/utils/database";

const Restaurant = database.define("Restaurant", {
	restaurant_uid: {
		type: DataTypes.UUID,
		allowNull: false,
		primaryKey: true,
		unique: true,
		defaultValue: DataTypes.UUIDV4,
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
	restaurant_name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	restaurant_description: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	open_time: {
		type: DataTypes.RANGE(DataTypes.DATE),
		allowNull: false,
	},
	price_range: {
		type: DataTypes.RANGE(DataTypes.INTEGER),
		allowNull: false,
	},
	cover_image: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	preview_images: {
		type: DataTypes.JSON,
		allowNull: true,
	},
	restaurant_address: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	available_seats: {
		type: DataTypes.JSON,
		allowNull: false,
	},
	food_menu: {
		type: DataTypes.JSON,
		allowNull: false,
	},
	seating_types: {
		type: DataTypes.JSON,
		allowNull: false,
	},
	contact_information: {
		type: DataTypes.JSON,
		allowNull: false,
	},
	rating_visibility: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
	},
	additional_information: {
		type: DataTypes.JSON,
		allowNull: true,
	},
	tables: {
		type: DataTypes.JSON,
		allowNull: false,
	},
});


export default Restaurant;
