require("module-alias/register");
const express = require("express");
import database from "@/utils/database";
import { Owner, Reservation } from "@/routes/index";
import { relations } from "@/models/index";
import { log } from "@/utils/logger";

/* Init application */
const app = express();
app.use(Owner);
app.use(Reservation);

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
