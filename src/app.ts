require("module-alias/register");
const express = require("express");
import database from "@/utils/database";
import {
	ReservationRoutes,
	AuthRoutes,
	RestaurantRoutes,
	ReviewRoutes,
	UserRoutes,
} from "@/routes/index";
import { Relations } from "@/models/index";
import { log } from "@/utils/logger";
import cors from "cors";
import { Config } from "@/config/index";
import { isAuth } from "@/middlewares/index";

/* Initialize Express  */
const app = express();

/* CORS Configuration */
app.use(
	cors({
		origin: Config.cors.origin,
		credentials: true,
	})
);

/* Adding Body Parser */
app.use(express.json());

/* Register Routes */
app.use(AuthRoutes);

/* Authentication Middleware */
app.use(isAuth);

/* App Routes */
app.use(UserRoutes);
app.use(ReservationRoutes);
app.use(RestaurantRoutes);
app.use(ReviewRoutes);

/* Model Relations */
Relations();

/* Sync Database And Start the Server */
database
	.sync()
	.then((res: Response) => {
		app.listen(process.env.PORT, () => {
			log.info(
				`Server Started At http://${process.env.DATABASE_HOST}/${process.env.PORT}, "${process.env.DATABASE_NAME}" Is Connected`
			);
		});
	})
	.catch((error: Error) => {
		log.error(`Error: ${error}`);
	});
