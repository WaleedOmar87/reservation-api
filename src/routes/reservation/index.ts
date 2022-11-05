import {
	getAllReservations,
	getReservationByID ,
	createReservation ,
	updateReservation,
	deleteReservation,
} from "@/controllers/reservation";
import * as Express from "express";

/* Initialize router */
const router: Express.Router = Express.Router();

router.get("/reservation/all", getAllReservations);
router.get("/reservation/", getReservationByID);
router.post('/reservation' , createReservation);
router.patch("/reservation/:id", updateReservation);
router.delete("/reservation/:id", deleteReservation);

export default router;
