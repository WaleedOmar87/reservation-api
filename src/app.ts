require("module-alias/register");
const express = require("express");
import database from "@/utils/database";
import {
	OwnerRoutes,
	ReservationRoutes,
	AuthRoutes,
	StaffRoutes,
	RestaurantRoutes,
	ReviewRoutes,
	CustomerRoutes,
} from "@/routes/index";
import { relations } from "@/models/index";
import { log } from "@/utils/logger";

/* Initialize Express  */
const app = express();

/* Adding Body Parser */
app.use(express.json());

/* Register Routes */
app.use(AuthRoutes);
app.use(CustomerRoutes);
app.use(OwnerRoutes);
app.use(ReservationRoutes);
app.use(StaffRoutes);
app.use(RestaurantRoutes);
app.use(ReviewRoutes);

/* Model Relations */
relations();
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
