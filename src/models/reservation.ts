const { DataTypes } = require("sequelize");
const Sequelize = require("database/database");
import { Customer } from "./";

const Reservation = Sequelize.define("Reservation", {
	reservation_uid: {
		type: DataTypes.UUID,
		unique: true,
		allowNull: false,
		primaryKey: true,
		defaultValue: DataTypes.UUIDV4,
	},
	table_number: {
		type: DataTypes.NUMBER,
		allowNull: false,
	},
	time_slot: {
		types: DataTypes.RANGE(DataTypes.DATE),
		allowNull: false,
	},
	party_size: {
		type: DataTypes.NUMBER,
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
		tpe: DataTypes.BOOLEAN,
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
});

Reservation.belongsTo(Customer);

export default Reservation;
