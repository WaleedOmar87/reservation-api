import { NextFunction, Response, Request, response } from "express";
import { Staff } from "@/models/index";
import { sendMail } from "@/utils/mailer";
import { log } from "@/utils/logger";
import { nanoid } from "nanoid";
import { ResponseInterface, CreateStaffInterface } from "@/types/index";
require("dotenv").config();

/* Get all staff */
export const getAllStaff = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let response: ResponseInterface;
	try {
		const getStaff = await Staff.findAll();
		response = {
			data: getStaff,
			message: "Fetched All Users",
			success: true,
			code: 200,
		};
	} catch (error: any) {
		response = {
			message: error.message,
			success: false,
			code: 500,
		};
	}
	res.status(response.code as number).json(response);
	next();
};

/* Get single staff member */
export const getStaffByID = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let response: ResponseInterface;
	try {
		let staffID = req.params.id;
		let staff = await Staff.findByPk(staffID);
		response = {
			data: staff,
			code: staff != null ? 200 : 400,
			success: staff != null ? true : false,
			message:
				staff != null
					? "User Fetched Successfully"
					: "Failed To Fetch User",
		};
	} catch (error: any) {
		log.error(error.message);
		response = {
			code: 500,
			message: error.message,
			success: false,
		};
	}
	res.status(response.code as number).json(response);
	next();
};

// Create staff member
export const createStaff = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let response: ResponseInterface;
	try {
		let body: CreateStaffInterface = req.body;
		const staff = await Staff.create({
			staff_name: body.staff_name,
			role: body.role,
			phone_number: body.phone_number,
			email: body.email,
			password: body.password,
			emailValidationKey: nanoid(),
		});

		// Send email with verification code to registered user
		await sendMail({
			from: process.env.USER_EMAIL,
			to: staff.email,
			subject: "Confirm Your Account",
			text: `Hello: ${staff.staff_name}, Please verify you account using the following code: ${staff.emailValidationKey}`,
		});

		response = {
			message: "Staff Member Created Successfully",
			success: true,
			code: 200,
		};
	} catch (error: any) {
		// Log error message
		log.error(`${error}`);
		response = {
			message: error.message,
			success: false,
			code: 500,
		};

		// User already exists
		if (error.code === 11000) {
			response.code = 409;
			response.message = "User Already Exits";
		}
	}
	res.status(response.code as number).json(response);
	next();
};

export const updateStaff = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let response: ResponseInterface;
	try {
		const body: CreateStaffInterface = req.body;
		const staff = await Staff.update(
			{
				...body,
			},
			{
				where: {
					staff_uid: body.id,
				},
			}
		);

		if (!staff) {
			response = {
				message: "User not found",
				success: false,
				code: 400,
			};
		} else {
			response = {
				message: "User Updated",
				data: staff,
				success: true,
				code: 200,
			};
		}
	} catch (error: any) {
		log.error(error.message);
		response = {
			code: 500,
			success: false,
			message: error.message,
		};
	}
	res.status(response.code as number).json(response);
	next();
};

export const deleteStaff = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let response: ResponseInterface;
	try {
		const body = req.body;
		const staff = await Staff.destroy({
			where: {
				staff_uid: body.id,
			},
		});
		if (staff == null) {
			response = {
				message: "Invalid and Non Existing User",
				success: false,
				code: 400,
			};
		} else {
			response = {
				message: "Deleted",
				data: staff,
				success: true,
				code: 200,
			};
		}
	} catch (error: any) {
		log.error(error.message);
		response = {
			message: error.message,
			code: 500,
			success: false,
		};
	}
	res.status(response.code as number).json(response);
	next();
};
