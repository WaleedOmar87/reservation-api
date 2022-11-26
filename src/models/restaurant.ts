const { DataTypes } = require("sequelize");
import database from "@/utils/database";
import {
	PreviewImagesInterface,
	DishInterface,
	SeatInterface,
	OtherInformationInterface,
	TablesInterface,
} from "@/types/models/Validate.interface";
import { validateJsonField } from "@/utils/validate";

export const Restaurant = database.define(
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
			allowNull: {
				arg: false,
				msg: "Please Choose a Country",
			},
		},
		provenance: {
			type: DataTypes.STRING,
			allowNull: {
				arg: false,
				msg: "Please Choose a Provenance",
			},
		},
		city: {
			type: DataTypes.STRING,
			allowNull: {
				arg: false,
				msg: "Please Choose a City",
			},
		},
		restaurant_name: {
			type: DataTypes.STRING,
			allowNull: {
				arg: false,
				msg: "Restaurant Name Cannot Be Empty",
			},
		},
		restaurant_description: {
			type: DataTypes.STRING,
			allowNull: {
				arg: false,
				msg: "Restaurant Description Cannot Be Empty",
			},
		},
		open_time: {
			type: DataTypes.JSON,
			allowNull: {
				arg: false,
				msg: "Please Choose Open and Close Time",
			},
			validate: {
				customValidator(openTime: []) {
					if (openTime.length < 1) {
						throw new Error("Invalid Open / Close Time");
					}
				},
			},
		},
		price_range: {
			type: DataTypes.RANGE(DataTypes.INTEGER),
			allowNull: {
				arg: false,
				msg: "Price Range Cannot Be Empty",
			},
		},
		cover_image: {
			type: DataTypes.STRING,
			allowNull: {
				arg: false,
				msg: "Cover Image Cannot Be Empty",
			},
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
			allowNull: {
				arg: false,
				msg: "Restaurant Address Cannot Be Empty",
			},
		},
		food_menu: {
			type: DataTypes.JSON,
			allowNull: {
				arg: false,
				msg: "Food Menu Cannot Be Empty",
			},
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
			allowNull: {
				arg: false,
				msg: "Seating Types Cannot Be Empty",
			},
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
			allowNull: {
				arg: false,
				msg: "Contact Information Cannot Be Empty",
			},
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
			allowNull: {
				arg: false,
				msg: "Restaurant Tables Cannot Be Empty",
			},
			validate: {
				customValidator(tables: TablesInterface[]) {
					return validateJsonField(tables, ["id", "title", "max_seats"]);
				},
			},
		},
		status: {
			type: DataTypes.STRING,
			allowNull: {
				arg: false,
				msg: "Please Check Restaurant Status",
			},
			validate: {
				is: /private|public/g,
			},
		},
	},
	{
		hooks: {
			// Validate and update open_time and price_range values
			beforeCreate: async (restaurant: {
				open_time?: [];
				price_range?: any[];
			}) => {
				if (restaurant.open_time && restaurant.open_time.length < 1) {
					throw new Error("Invalid Open / Close Time");
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
			beforeUpdate: async (restaurant: { open_time?: [] }) => {
				if (restaurant.open_time && restaurant.open_time.length < 1) {
					throw new Error("Invalid Open / Close Time");
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
