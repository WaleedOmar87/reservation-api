import {
	createOwner,
	updateOwner,
	getOwnerByID,
	deleteOwner,
	getAllOwners,
} from "@/controllers/owner";
import * as Express from "express";

/* Initialize router */
const router: Express.Router = Express.Router();

router.get("/owner/all", getAllOwners);
router.get("/owner/:id", getOwnerByID);
router.post("/owner", createOwner);
router.patch("/owner", updateOwner);
router.delete("/owner", deleteOwner);

export default router;
