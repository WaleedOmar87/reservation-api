import { NextFunction, Response, Request } from "express";
import { Customer, Reservation } from "@/models/index";
import { ResponseInterface, ErrorInterface } from "@/types/index";
import { log } from "@/utils/logger";
import { sendMail } from "@/utils/mailer";
import { nanoid } from "nanoid";

// Get all customers
export const getAllCustomers = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let response: ResponseInterface;
	try {
		const customers = await Customer.findAll();
		if (!customers || customers.length < 1) {
			response = {
				message: "No Customers Were Found",
				code: 400,
				success: false,
			};
		} else {
			response = {
				data: customers,
				message: "Customers Found ",
				code: 200,
				success: true,
			};
		}
	} catch (error: ErrorInterface | any) {
		log.error(error);
		response = {
			message: `Unexpected Error: ${error.message}`,
			code: 500,
			success: false,
		};
	}
	res.status(response.code).json(response);
	next();
};

/* Get Customer By ID */
export const getCustomerByID = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let response: ResponseInterface;
	try {
		const customerID = req.body.id;
		const customer = await Customer.findByPK(customerID);
		if (!customer) {
			response = {
				message: "User Not Found",
				success: false,
				code: 400,
			};
		} else {
			response = {
				data: customer,
				message: "User were found",
				code: 200,
				success: true,
			};
		}
	} catch (error: ErrorInterface | any) {
		log.error(error);
		response = {
			message: `Error: ${error.message}`,
			success: false,
			code: 500,
		};
	}
	res.status(response.code).json(response);
	next();
};

// Get reservation with customer
export const getReservationWithCustomer = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let response: ResponseInterface;
	try {
		let reservationID = req.body.reservationID;
		let reservationWithCustomer = Reservation.findAll({
			where: {
				reservation_uid: reservationID,
			},
			include: [
				{
					model: Customer,
					as: "Customer",
				},
			],
		});
		if (!reservationWithCustomer) {
			response = {
				message: "User not found",
				code: 400,
				success: false,
			};
		} else {
			response = {
				data: reservationWithCustomer,
				success: true,
				code: 200,
			};
		}
	} catch (error: ErrorInterface | any) {
		log.error(error);
		response = {
			message: `Error: ${error.message}`,
			code: 500,
			success: false,
		};
	}
	res.status(response.code).json(response);
	next();
};

// Create customer
export const createCustomer = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let response: ResponseInterface;
	try {
		let body = req.body;
		let newCustomer = await Customer.create({
			...body,
			emailValidationKey: nanoid(),
		});

		// Send email with verification code to registered user
		await sendMail({
			from: process.env.USER_EMAIL,
			to: newCustomer.email,
			subject: "Confirm Your Account",
			text: `Hello: ${newCustomer.customer_name}, Please verify you account using the following code: ${newCustomer.emailValidationKey}`,
		});

		response = {
			message: "User Created Successfully",
			success: true,
			code: 200,
		};
	} catch (error: ErrorInterface | any) {
		response = {
			message: error.message,
			success: true,
			code: 500,
		};
	}
	res.status(response.code).json(response);
	next();
};

// Update Customer
export const updateCustomer = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let response: ResponseInterface;
	try {
		const body = req.body;
		let customer = await Customer.findByPk(body.id);
		if (!customer) {
			response = {
				message: "User Not Found",
				code: 400,
				success: false,
			};
		} else {
			await customer.update({ ...body });
			await customer.save();
			response = {
				message: "User Updated Successfully",
				code: 200,
				success: true,
			};
		}
	} catch (error: ErrorInterface | any) {
		response = {
			message: `Failed To Update User ${error.message}`,
			code: 500,
			success: false,
		};
	}
	res.status(response.code).json(response);
	next();
};

// Delete customer
export const deleteCustomer = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let response: ResponseInterface;

	try {
		let body = req.body;
		let customer = await Customer.findByPk(body.id);
		if (!customer) {
			response = {
				message: "User Not Found",
				success: false,
				code: 400,
			};
		} else {
			await customer.destroy();
			response = {
				message: "User Deleted Successfully",
				code: 200,
				success: true,
			};
		}
	} catch (error: ErrorInterface | any) {
		response = {
			message: `Error: ${error.message}`,
			code: 500,
			success: false,
		};
	}
	res.status(response.code).json(response);
	next();
};
