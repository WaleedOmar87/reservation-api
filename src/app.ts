require("module-alias/register");
const express = require("express");
import database from "@/utils/database";
import { Owner, Reservation, Auth, Staff } from "@/routes/index";
import { relations } from "@/models/index";
import { log } from "@/utils/logger";

/* Init application */
const app = express();

// Adding body parser
app.use(express.json());

/* Register Routes */
app.use(Auth);
app.use(Owner);
app.use(Reservation);
app.use(Staff);

/* Sync Database Models */
// Perform models relations
relations();
database
	.sync()
	.then((res: Response) => {
		app.listen(process.env.PORT, () => {
			log.info("Server Started and Connected To Database");
		});
	})
	.catch((error: Error) => {
		log.error(`Error: ${error}`);
	});
