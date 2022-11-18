import {
	Reservation,
	Owner,
	Customer,
	Review,
	Restaurant,
} from "@/models/index";

export default () => {
	Owner.hasMany(Restaurant, {
		constrains: true,
		onDelete: "CASCADE",
	});
	Restaurant.belongsTo(Owner, {
		constrains: true,
		onDelete: "CASCADE",
		foreignKey: "owner_uid",
	});

	Customer.hasMany(Reservation, { constrains: true, onDelete: "CASCADE" });
	Customer.hasMany(Review, { constrains: true, onDelete: "CASCADE" });
	Review.belongsTo(Customer, {
		constrains: true,
		onDelete: "CASCADE",
		foreignKey: "customer_uid",
	});
	Reservation.belongsTo(Customer, {
		constrains: true,
		onDelete: "CASCADE",
		foreignKey: "customer_uid",
	});
	Restaurant.hasMany(Reservation, { constrains: true, onDelete: "CASCADE" });
	Restaurant.hasMany(Review, { constrains: true, onDelete: "CASCADE" });
};
