const { DataTypes } = require("sequelize");
import database from "@/utils/database";
import { updateTimeSlot } from "@/helpers/index";

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
		table_number: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		time_slot: {
			type: DataTypes.RANGE(DataTypes.DATE),
			allowNull: false,
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
		},
		expired: {
			type: DataTypes.BOOLEAN,
			allowNull: true,
		},
		order_details: {
			type: DataTypes.JSON,
			allowNull: false,
		},
		occasion: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		seating_type: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	},
	{
		hooks: {
			// Update time slot of the reservation before create and update
			beforeCreate: (reservation: { time_slot?: object[] }) => {
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
