import {
	forgotPassword,
	resetPassword,
	verifyEmailAddress,
} from "@/controllers/auth";
import {
	getStaffByID,
	getAllStaff,
	createStaff,
	updateStaff,
	deleteStaff,
} from "@/controllers/staff";
import * as Express from "express";

/* Initialize router */
const router: Express.Router = Express.Router();

router.get("/staff", getAllStaff);
router.get("/staff/:id", getStaffByID);
router.post("/staff", createStaff);
router.patch("/staff", updateStaff);
router.delete("/staff", deleteStaff);

// Verify Email
router.post("/staff/verify_email/:id/:validation_key", verifyEmailAddress);

// Forgot Password
router.post("/staff/forgotpassword/:email", forgotPassword);

// Reset Password
router.post("/staff/resetpassword/:email/:reset_key", resetPassword);

export default router;
