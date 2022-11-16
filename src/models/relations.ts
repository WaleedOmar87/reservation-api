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
		foreignKey: "owner_uid",
	});
	Customer.hasMany(Reservation, {
		foreignKey: "customer_uid",
		onDelete: "CASCADE",
		constrains: true,
	});
	Customer.hasMany(Review, {
		foreignKey: "customer_uid",
		onDelete: "CASCADE",
		constraints: true,
	});
	Restaurant.belongsTo(Owner, {
		constrains: true,
		foreignKey: "owner_uid",
	});
	// Added to migration
	Restaurant.hasMany(Reservation, {
		onDelete: "CASCADE",
		constrains: true,
		foreignKey: "reservation_uid",
	});
	// Added to migration
	Reservation.belongsTo(Restaurant, {
		constraints: true,
		foreignKey: "restaurant_uid",
	});
	Reservation.belongsTo(Customer, {
		constrains: true,
		foreignKey: "customer_uid",
	});
	Review.belongsTo(Customer, {
		constrains: true,
		foreignKey: "customer_uid",
	});
	// Added to migration
	Customer.hasMany(Review, {
		onDelete: "CASCADE",
		constraints: true,
		foreignKey: "review_uid",
	});
	Restaurant.hasMany(Review, {
		onDelete: "CASCADE",
		constraints: true,
		foreignKey: "review_uid",
	});
};
