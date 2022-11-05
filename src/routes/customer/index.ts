import {
	getAllCustomers,
	getCustomerByID,
	createCustomer,
	updateCustomer,
	deleteCustomer,
	getReservationWithCustomer,
} from "@/controllers/customer";
import * as Express from "express";
import { validateResources } from "@/middlewares/index";

/* Initialize router */
const router: Express.Router = Express.Router();

router.get("/customer/all", getAllCustomers);
router.get("/customer/:id", getCustomerByID);
router.get(
	"/customer/byreservation/:reservation_id",
	getReservationWithCustomer
);

router.post("/customer", validateResources, createCustomer);
router.patch("/customer", validateResources, updateCustomer);
router.delete("/customer", validateResources, deleteCustomer);

export default router;
