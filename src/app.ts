require("module-alias/register");
const express = require("express");
import database from "@/utils/database";
import { Owner, Reservation } from "@/routes/index";
import { relations } from "@/models/index";

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
		/* Listen on port 8888 */
		app.listen(process.env.PORT, () => {
			console.log("server is running");
		});
	})
	.catch((error: Error) => {
		console.log(error);
	});
