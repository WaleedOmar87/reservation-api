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

router.get("/owner/:id", getOwnerByID);
router.get("/owner/all", getAllOwners);
router.post("/owner", createOwner);
router.patch("/owner/:id", updateOwner);
router.delete("/owner/:id", deleteOwner);

export default router;
