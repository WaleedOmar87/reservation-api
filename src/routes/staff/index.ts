import { verifyEmailAddress } from "@/controllers/auth";
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

router.get("/staff/:id", getStaffByID);
router.get("/staff", getAllStaff);
router.post("/staff", createStaff);
router.patch("/staff", updateStaff);
router.delete("/staff", deleteStaff);

// Verify Email
router.post('/staff/verify_email/:id/:validation_key' , verifyEmailAddress);

export default router;
