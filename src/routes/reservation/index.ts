import {
	getAllReservations,
	getReservationByID,
	createReservation,
	updateReservation,
	deleteReservation,
} from "@/controllers/reservation";
import { checkUserRole } from "@/middlewares/checkUserRole";
import * as Express from "express";

/* Initialize router */
const router: Express.Router = Express.Router();

router.get(
	"/reservation",
	checkUserRole(["admin", "staff", "owner"]),
	getAllReservations
);
router.get(
	"/reservation/:id",
	checkUserRole(["admin", "staff", "owner"]),
	getReservationByID
);
router.post("/reservation", createReservation);
router.patch(
	"/reservation",
	checkUserRole(["admin", "staff", "owner"]),
	updateReservation
);
router.delete(
	"/reservation",
	checkUserRole(["admin", "staff", "owner"]),
	deleteReservation
);

export default router;
