import {
	getAllCustomers,
	getCustomerByID,
	getCustomerByReservationID,
	createCustomer,
	updateCustomer,
	deleteCustomer,
} from "@/controllers/customer";
import * as Express from "express";
import { validateResources } from "@/middlewares/index";

/* Initialize router */
const router: Express.Router = Express.Router();

router.get("/customer/all", getAllCustomers);
router.get("/customer/:id", getCustomerByID);
router.get(
	"/customer/by_reservation/:reservation_id",
	getCustomerByReservationID
);

router.post("/customer", validateResources, createCustomer);
router.patch("/customer", validateResources, updateCustomer);
router.delete("/customer", validateResources, deleteCustomer);

export default router;
