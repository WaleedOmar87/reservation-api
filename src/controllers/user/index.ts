import { NextFunction, Response, Request } from "express";
import { nanoid } from "nanoid";
import { sendMail } from "@/utils/mailer";
import { User, Reservation } from "@/models/index";
import { ResponseInterface, ErrorInterface } from "@/types/index";
import { log } from "@/utils/logger";

/* Get Users */
export const getUsers = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let response: ResponseInterface;
	try {
		let users = await User.findAll();
		response = {
			message: "Fetched All Users",
			data: users,
			success: true,
			code: 200,
		};
	} catch (error: ErrorInterface | any) {
		log.error(`Error: ${error.message}`);
		response = {
			message: error.message,
			code: 500,
			success: false,
		};
	}
	res.status(response.code).json(response);
	next();
};

// Get Single User
export const getUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let response: ResponseInterface;
	try {
		let { id } = req.params;
		let user = await User.findByPk(id);

		if (!getUser) {
			response = {
				message: "User Not Found",
				code: 400,
				success: false,
			};
		} else {
			response = {
				message: "User Found",
				data: user,
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

// Create New User
export const createUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let response: ResponseInterface;
	try {
		let { body } = req;
		let newUser = await User.create({
			...body,
			emailValidationKey: nanoid(),
		});

		// Send email with verification code to registered user
		await sendMail({
			from: process.env.USER_EMAIL,
			to: newUser.email,
			subject: "Confirm Your Account",
			text: `Hello: ${newUser.user_name}, Please verify you account using the following code: ${newUser.emailValidationKey}`,
		});
		response = {
			message: "User Created Successfully",
			success: true,
			code: 200,
		};
	} catch (Error: ResponseInterface | any) {
		log.error(Error);
		response = Error.errors[0].message;
	}
	res.status(response.code ? response.code : 500).json(response);
	next();
};

export const updateUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let response: ResponseInterface;
	try {
		let { body } = req;
		let user = await User.findByPk(body.id);
		if (!user) {
			response = {
				message: "User Not Found",
				code: 400,
				success: false,
			};
		} else {
			await user.update({ ...body });
			await user.save();
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

export const deleteUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let response: ResponseInterface;

	try {
		let { body } = req;
		let user = await User.findByPk(body.id);
		if (!user) {
			response = {
				message: "User Not Found",
				success: false,
				code: 400,
			};
		} else {
			await User.destroy();
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

// Get user by reservation id
export const getUserWithReservation = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let response: ResponseInterface;
	try {
		let { id } = req.params;
		let userWithReservation = Reservation.findAll({
			where: {
				reservation_uid: id,
			},
			include: [
				{
					model: User,
					as: "User",
				},
			],
		});
		if (!userWithReservation) {
			response = {
				message: "User not found",
				code: 400,
				success: false,
			};
		} else {
			response = {
				data: userWithReservation,
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
