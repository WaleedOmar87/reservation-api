import { NextFunction, Response, Request } from "express";
import { Staff } from "@/models/index";
import { sendMail } from "@/utils/mailer";
import { log } from "@/utils/logger";

/* Get all staff */
export const getAllStaff = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const getStaff = await Staff.findAll();
		res.json({
			data: getStaff,
			success: true,
		});
	} catch (error: any) {
		res.status(500).json({
			message: error.message,
		});
	}
	next();
};

/* Get single staff member */
export const getStaffByID = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		let staffID = req.params.id;
		let staff = await Staff.findByPk(staffID);
		res.status(200).json({
			data: staff,
			success: true,
			message: "Found",
		});
	} catch (error: any) {
		log.error(error.message);
		res.json({
			message: `${error.message}`,
		});
	}
	next();
};

// Create staff member
export const createStaff = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const body = req.body;
		const staff = await Staff.create({
			staff_name: body.staff_name,
			role: body.role,
			phone_number: body.phone_number,
			email: body.email,
			password: body.password,
		});

		// Send email with verification code to registered user
		await sendMail({
			from: "admin@google.com",
			to: staff.email,
			subject: "Confirm Your Account",
			text: `Hello: ${staff.staff_name}, Please verify you account using the following code: ${staff.verificationCode}`,
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
		res.status(200).json({
			message: "Deleted",
			data: staff,
			success: true,
		});
	} catch (error: any) {
		log.error(error.message);
		res.json({
			message: error.message,
		});
	}
};
