const { DataTypes } = require("sequelize");
import database from "@/utils/database";
import { createOpenTime } from "@/utils/dateTime";
import { log } from "@/utils/logger";
import {
	PreviewImagesInterface,
	AvailableSeatsInterface,
	DishInterface,
	SeatInterface,
	OtherInformationInterface,
	TablesInterface,
} from "@/types/models/Validate.interface";
import { validateJsonField } from "@/utils/validate";

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
			validate: {
				customValidator(previewImages: PreviewImagesInterface[]) {
					return validateJsonField(previewImages, ["id", "title", "url"]);
				},
			},
		},
		restaurant_address: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		available_seats: {
			type: DataTypes.JSON,
			allowNull: false,
			validate: {
				customValidator(availableSeats: AvailableSeatsInterface[]) {
					return validateJsonField(availableSeats, [
						"total_price",
						"special_request",
					]);
				},
			},
		},
		food_menu: {
			type: DataTypes.JSON,
			allowNull: false,
			validate: {
				customValidator(dishes: DishInterface[]) {
					return validateJsonField(dishes, [
						"id",
						"title",
						"description",
						"price",
					]);
				},
			},
		},
		seating_types: {
			type: DataTypes.JSON,
			allowNull: false,
			validate: {
				customValidator(seats: SeatInterface[]) {
					return validateJsonField(seats, [
						"id",
						"title",
						"description",
						"additional_fee",
					]);
				},
			},
		},
		contact_information: {
			type: DataTypes.JSON,
			allowNull: false,
			validate: {
				customValidator(contactInformation: OtherInformationInterface[]) {
					return validateJsonField(contactInformation, ["title"]);
				},
			},
		},
		rating_visibility: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
		},
		additional_information: {
			type: DataTypes.JSON,
			allowNull: true,
			validate: {
				customValidator(
					additionalInformation: OtherInformationInterface[]
				) {
					return validateJsonField(additionalInformation, ["title"]);
				},
			},
		},
		tables: {
			type: DataTypes.JSON,
			allowNull: false,
			validate: {
				customValidator(tables: TablesInterface[]) {
					return validateJsonField(tables, ["id", "title", "seats"]);
				},
			},
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
					const timeRange = createOpenTime(restaurant.open_time);
					log.info(`Current rage: ${JSON.stringify(timeRange)}`);
					restaurant.open_time = timeRange;
				}
			},
		},
		indexes: [
			{
				fields: ["restaurant_uid"],
				unique: true,
			},
			{
				fields: ["city", "country", "provenance"],
			},
		],
	}
);

export default Restaurant;
