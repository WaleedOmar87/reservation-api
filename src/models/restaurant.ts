const { DataTypes } = require("sequelize");
import database from "@/utils/database";

const Restaurant = database.define(
	"Restaurant",
	{
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
			type: DataTypes.RANGE(DataTypes.DATEONLY),
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
		status: {
			type: DataTypes.STRING,
			validate: {
				is: /private|public/g,
			},
		},
	},
	{
		hooks: {
			// Update ranges
			beforeCreate: async (restaurant: {
				open_time?: any;
				price_range?: any;
			}) => {
				// Update Open Time
				if (restaurant.open_time) {
					const timeRange = [
						{ value: new Date(restaurant.open_time[0]) },
						{ value: new Date(restaurant.open_time[1]) },
					];
					restaurant.open_time = timeRange;
				}

				// Update Price Range
				if (restaurant.price_range) {
					const priceRange = [
						{ value: restaurant.price_range[0] },
						{ value: restaurant.price_range[1] },
					];
					restaurant.price_range = priceRange;
				}
			},
			beforeUpdate: async (restaurant: { open_time?: any }) => {
				if (restaurant.open_time) {
					const range = [
						{ value: new Date(restaurant.open_time[0]) },
						{ value: new Date(restaurant.open_time[1]) },
					];
					restaurant.open_time = range;
				}
			},
		},
		indexes: [
			{
				fields: ["restaurant_uid"],
				unique: true,
			},
		],
	}
);

export default Restaurant;
