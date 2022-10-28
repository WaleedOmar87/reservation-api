import {
	getAllCustomers,
	getCustomerByID,
	getCustomerByReservationID,
	createCustomer,
	updateCustomer,
	deleteCustomer,
} from "@/controllers/customer";
import * as Express from "express";

/* Initialize router */
const router: Express.Router = Express.Router();

router.get("/customer/all", getAllCustomers);
router.get("/customer/:id", getCustomerByID);
router.get(
	"/customer/by_reservation/:reservation_id",
	getCustomerByReservationID
);
router.post("/customer", createCustomer);
router.patch("/customer", updateCustomer);
router.delete("/customer", deleteCustomer);

export default router;
