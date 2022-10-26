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
		foreignKey: "owner_uid",
	});
	Customer.hasMany(Reservation, {
		foreignKey: "customer_uid",
		constrains: true,
	});
	Customer.hasMany(Review, {
		foreignKey: "customer_uid",
		constraints: true,
	});
	Restaurant.belongsTo(Owner, {
		constrains: true,
		foreignKey: "owner_uid",
	});
	Reservation.belongsTo(Customer, {
		constrains: true,
		foreignKey: "customer_uid",
	});
	Review.belongsTo(Customer, {
		constrains: true,
		foreignKey: "customer_uid",
	});
};
