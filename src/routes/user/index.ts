import * as Express from "express";
import {
	getUser,
	getUsers,
	createUser,
	updateUser,
	deleteUser,
	getUserWithReservation,
} from "@/controllers/user";
import {
	verifyEmailAddress,
	forgotPassword,
	resetPassword,
} from "@/controllers/auth";
import { validateResources } from "@/middlewares/index";

/* Initialize router */
const router: Express.Router = Express.Router();

router.get("/user", getUsers);
router.get("/user/:id", getUser);
router.get("/user/by_reservation/:reservation_id", getUserWithReservation);
router.post("/user/verify_email/:id/:validation_key", verifyEmailAddress);
router.post("/user/forgot_password/:email", forgotPassword);
router.post("/user/reset_password/:email/:reset_key", resetPassword);
router.post("/user", validateResources, createUser);
router.patch("/user", validateResources, updateUser);
router.delete("/user", validateResources, deleteUser);

export default router;