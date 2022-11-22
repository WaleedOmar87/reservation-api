import { NextFunction, Response, Request } from "express";
import { ResponseInterface } from "@/types/index";
import { log } from "@/utils/logger";
import bcrypt from "bcrypt";
import { Session, User } from "@/models/index";
require("dotenv").config();

/* Create Login Session */
export const createSession = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let response: ResponseInterface;
	try {
		const { email, password } = req.body;

		// Find user
		let user = User.findOne({
			where: {
				user_email: email,
			},
		});

		// Validate User Password
		let validatePassword =
			user && (await bcrypt.compare(password, user.user_password));

		// Check if user exists
		if (!user || !validatePassword) {
			throw {
				code: 400,
				message: "Wrong Email or Password",
				success: false,
			};
		}

		// Check if user email is validated
		if (!user.email_verified) {
			throw {
				code: 203,
				message: "Email Is Not Verified",
				success: false,
			};
		}

		// Create user session and return tokens
		let session = Session.create({
			user: user.user_uid,
		});
		let tokens = [{}];
		response = {
			code: 200,
			message: "Login Successfully",
			success: true,
			data: [...tokens],
		};
	} catch (Error: ResponseInterface | any) {
		log.error(Error);
		response = Error;
	}
	res.status(response.code).json(response);
	next();
};

export const deleteSession = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let response: ResponseInterface;
	try {
		const { email } = req.body;
		// Find user session

		// Delete user session

		// Reset access token

		response = {
			code: 200,
			message: "Logout",
			success: true,
		};
	} catch (Error: ResponseInterface | any) {
		log.error(Error);
		response = Error;
	}
	res.status(response.code).json(response);
};
