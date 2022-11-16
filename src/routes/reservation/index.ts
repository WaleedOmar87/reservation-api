import {
	getAllReservations,
	getReservationByID,
	createReservation,
	updateReservation,
	deleteReservation,
} from "@/controllers/reservation";
import * as Express from "express";

/* Initialize router */
const router: Express.Router = Express.Router();

router.get("/reservation", getAllReservations);
router.get("/reservation/:id", getReservationByID);
router.post("/reservation", createReservation);
router.patch("/reservation", updateReservation);
router.delete("/reservation", deleteReservation);

export default router;
