import { Reservation, Review, User, Restaurant } from "@/models/index";
import { Session } from "@/models/index";

export const Relations = () => {
	User.hasMany(Restaurant, {
		constrains: true,
		onDelete: "CASCADE",
	});
	Restaurant.belongsTo(User, {
		constrains: true,
		onDelete: "CASCADE",
		foreignKey: "user_uid",
	});

	User.hasMany(Reservation, { constrains: true, onDelete: "CASCADE" });
	User.hasMany(Review, { constrains: true, onDelete: "CASCADE" });
	Review.belongsTo(User, {
		constrains: true,
		onDelete: "CASCADE",
		foreignKey: "user_uid",
	});
	Reservation.belongsTo(User, {
		constrains: true,
		onDelete: "CASCADE",
		foreignKey: "user_uid",
	});
	Restaurant.hasMany(Reservation, { constrains: true, onDelete: "CASCADE" });
	Restaurant.hasMany(Review, { constrains: true, onDelete: "CASCADE" });
	Session.belongsTo(User, { constrains: true, onDelete: "CASCADE" });
};
