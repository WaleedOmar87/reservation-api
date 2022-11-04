import { NextFunction, Response, Request } from "express";
import { nanoid } from "nanoid";
import { sendMail } from "@/utils/mailer";
import { Owner } from "@/models/index";
import {
	ResponseInterface,
	ErrorInterface,
} from "@/types/index";
import { log } from "@/utils/logger";

/* Get all owners */
export const getAllOwners = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let response: ResponseInterface;
	try {
		let getOwners = await Owner.findAll();
		response = {
			message: "Fetched All Users",
			data: getOwners,
			success: true,
			code: 200,
		};
	} catch (error: ErrorInterface | any) {
		log.error(`type: ${error.type} - ${error.message}`);
		response = {
			message: error.message,
			code: 500,
			success: false,
		};
	}
	res.status(response.code).json(response);
	next();
};

/* Get single owner */
export const getOwnerByID = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let response: ResponseInterface;
	try {
		let ownerID = req.params.id;
		let getOwner = await Owner.findByPk(ownerID);

		if (!getOwner) {
			response = {
				message: "User Not Found",
				code: 400,
				success: false,
			};
		} else {
			response = {
				message: "User Found",
				data: getOwner,
				code: 200,
				success: true,
			};
		}
	} catch (error: ErrorInterface | any) {
		response = {
			message: error.message,
			code: 500,
			success: false,
		};
	}
	res.status(response.code).json(response);

	next();
};

// Create New Owner
export const createOwner = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let response: ResponseInterface;
	try {
		let body = req.body;
		let newOwner = await Owner.create({
			...body,
			emailValidationKey: nanoid(),
		});

		// Send email with verification code to registered user
		await sendMail({
			from: process.env.USER_EMAIL,
			to: newOwner.email,
			subject: "Confirm Your Account",
			text: `Hello: ${newOwner.owner_name}, Please verify you account using the following code: ${newOwner.emailValidationKey}`,
		});

		response = {
			message: "Owner Created Successfully",
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

export const updateOwner = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let response: ResponseInterface;
	try {
		const body = req.body;
		let owner = await Owner.findByPk(body.id);
		if (!owner) {
			response = {
				message: "User Not Found",
				code: 400,
				success: false,
			};
		} else {
			await owner.update({ ...body });
			await owner.save();
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

export const deleteOwner = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let response: ResponseInterface;

	try {
		let body = req.body;
		let owner = await Owner.findByPk(body.id);
		if (!owner) {
			response = {
				message: "Owner Not Found",
				success: false,
				code: 400,
			};
		} else {
			await owner.destroy();
			response = {
				message: "User Deleted Successfully",
				code: 200,
				success: true,
			};
		}
	} catch (error: ErrorInterface | any) {
		response = {
			message: "Something Went Wrong",
			code: 500,
			success: false,
		};
	}
	res.status(response.code).json(response);
	next();
};
