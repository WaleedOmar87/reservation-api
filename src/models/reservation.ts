const { DataTypes } = require("sequelize");
import database from "@/utils/database";
import { updateTimeSlot } from "@/helpers/index";
import { validateJsonField } from "@/utils/validate";
import { OrderDetailsInterface, OrderItemsInterface } from "../types";

const Reservation = database.define(
	"Reservation",
	{
		reservation_uid: {
			type: DataTypes.UUID,
			unique: true,
			allowNull: false,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
		},
		table_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				notEmpty: true,
				notNull: true,
			},
		},
		time_slot: {
			type: DataTypes.RANGE(DataTypes.DATE),
			allowNull: false,
			validate: {
				notEmpty: true,
				notNull: true,
			},
		},
		party_size: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				min: 1,
				max: 20,
			},
		},
		reservation_date: {
			type: DataTypes.DATE,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
		expired: {
			type: DataTypes.BOOLEAN,
			allowNull: true,
		},
		order_items: {
			type: DataTypes.JSON,
			allowNull: false,
			validate: {
				customValidator(orderItems: OrderItemsInterface[]) {
					return validateJsonField(orderItems, [
						"dish_id",
						"dish_title",
						"dish_description",
					]);
				},
			},
		},
		order_details: {
			type: DataTypes.JSON,
			allowNull: false,
			validate: {
				customValidator(orderDetails: OrderDetailsInterface) {
					return validateJsonField(orderDetails, [
						"total_price",
						"special_request",
					]);
				},
			},
		},
		order_total: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				min: 1,
			},
		},
		order_special_request: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		occasion: {
			type: DataTypes.STRING,
			allowNull: true,
			validate: {
				notEmpty: true,
			},
		},
		seating_type: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	},
	{
		hooks: {
			beforeCreate: (reservation: { time_slot?: object[] }) => {
				// Validate and update time_slot
				if (reservation.time_slot) {
					reservation.time_slot = updateTimeSlot(reservation.time_slot);
				}
			},
			beforeUpdate: (reservation: { time_slot?: object[] }) => {
				if (reservation.time_slot) {
					reservation.time_slot = updateTimeSlot(reservation.time_slot);
				}
			},
		},
		indexes: [
			{
				fields: ["reservation_uid"],
				unique: true,
			},
		],
	}
);

export default Reservation;
