import express from "express";
import database from "./database/database";

/* Require routes */
const ownerRoutes = require("./routes/admin");
const customerRoutes = require("./routes/shop");
const restaurantRoutes = require("./routes/auth");
const reviewRoutes = require("routes/review");
const reservationRoute = require("routes/reservation");

/* Init application */
const app = express();
app.use(ownerRoutes);
app.use(customerRoutes);
app.use(reviewRoutes);
app.use(restaurantRoutes);
app.use(reservationRoute);

/* Sync Database Models */
database
	.sync()
	.then((res: Response) => {
		/* Listen on port 8888 */
		app.listen(process.env.PORT, () => {
			console.log("server is running");
		});
	})
	.catch((error: Error) => {
		console.log(error);
	});
