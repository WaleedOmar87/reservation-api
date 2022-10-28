import { NextFunction, Response, Request } from "express";
import { Customer } from "@/models/index";

// Get all customers
export const getAllCustomers = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const customers = await Customer.findAll();
	res.json({
		data: customers,
		message: "Done",
	});
	next();
};

// Get customer by id
export const getCustomerByID = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const customerID = req.params.customer_id;
	const customer = await Customer.findByPK(customerID);
	res.json({
		data: customer,
		message: "Done",
	});
	next();
};

// Get customer by reservation id
export const getCustomerByReservationID = () => {};

// Create customer
export const createCustomer = () => {};

// Update Customer
export const updateCustomer = () => {};

// Delete customer
export const deleteCustomer = () => {};
