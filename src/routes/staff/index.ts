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

export default router;
