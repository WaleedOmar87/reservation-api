import { NextFunction, Response, Request } from "express";
import { Staff } from "@/models/index";
import { sendMail } from "@/utils/mailer";
import { log } from "@/utils/logger";
import { nanoid } from "nanoid";
import { responseInterface } from "@/types/index";

/* Get all staff */
export const getAllStaff = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let response: responseInterface = {};

	try {
		const getStaff = await Staff.findAll();
		response = {
			data: getStaff,
			message: "Fetched All Users",
			success: true,
		};
	} catch (error: any) {
		response = {
			message: error.message,
			success: false,
		};
	}
	res.json(response);
	next();
};

/* Get single staff member */
export const getStaffByID = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let response: responseInterface;
	try {
		let staffID = req.params.id;
		let staff = await Staff.findByPk(staffID);
		response = {
			data: staff,
			success: staff != null ? true : false,
			message:
				staff != null
					? "User Fetched Successfully"
					: "Failed To Fetch User",
		};
	} catch (error: any) {
		log.error(error.message);
		response = {
			message: error.message,
			success: false,
		};
	}
	res.json(response);
	next();
};

// Create staff member
export const createStaff = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let response: responseInterface;
	try {
		const staff = await Staff.create({
			staff_name: req.body.staff_name,
			role: req.body.role,
			phone_number: req.body.phone_number,
			email: req.body.email,
			password: req.body.password,
			emailValidationKey: nanoid(), // create email verification code
		});

		// Send email with verification code to registered user
		await sendMail({
			from: "admin@google.com",
			to: staff.email,
			subject: "Confirm Your Account",
			text: `Hello: ${staff.staff_name}, Please verify you account using the following code: ${staff.emailValidationKey}`,
		});

		res.status(200).json({
			message: "Staff Member Created Successfully",
		});
	} catch (error: any) {
		// Log error message
		log.error(`${error}`);

		// User already exists
		if (error.code === 11000) {
			res.status(409).json({
				message: "User Already Exits",
			});
		}

		// Other error message
		res.status(500).json({
			message: `Something Went Wrong`,
		});
	}
	next();
};

export const updateStaff = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const body = req.body;
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
		res.status(200).json({
			message: "Updated",
			data: staff,
			success: true,
		});
	} catch (error: any) {
		log.error(error.message);
		res.json({
			message: error.message,
		});
	}
	next();
};

export const deleteStaff = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const body = req.body;
		const staff = await Staff.destroy({
			where: {
				staff_uid: body.id,
			},
		});
		if (staff == null) {
			res.status(400).json({
				message: "Invalid and Non Existing User",
				success: false,
			});
		} else {
			res.status(200).json({
				message: "Deleted",
				data: staff,
				success: true,
			});
		}
	} catch (error: any) {
		log.error(error.message);
		res.json({
			message: error.message,
		});
	}
	next();
};
