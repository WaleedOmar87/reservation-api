import { NextFunction, Response, Request } from "express";
import fetchUser from "@/helpers/fetchUser";
import { ResponseInterface } from "@/types/index";
import { log } from "@/utils/logger";
import { nanoid } from "nanoid";
import { sendMail } from "@/utils/mailer";
require("dotenv").config();

/* Verify Email Address */
export const verifyEmailAddress = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let response: ResponseInterface;
	try {
		// Get user and response from fetchUser helper
		let user = await fetchUser({
			id: req.params.id,
			type: req.originalUrl,
			validationKey: req.params.validation_key,
		});
		if (user == null) {
			response = {
				message: "User could not be found",
				code: 400,
				success: false,
			};
		} else {
			// If user is found and validation key is valid
			if (user.emailValidationKey === req.params.validationKey) {
				user.emailValidationKey = "";
				user.email_verified = true;
				user.save();
				response = {
					message: "User Updated",
					code: 200,
					success: true,
				};
			} else {
				response = {
					message: "Invalid Validation Key",
					code: 404,
					success: false,
				};
			}
		}
	} catch (error: { message?: string; code?: number } | any) {
		response = {
			code: 500,
			message: error.message,
			success: false,
		};
	}
	res.status(response.code as number).json(response);
	next();
};

/* Forgot Password */
export const forgotPassword = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let response: ResponseInterface;
	try {
		let user = await fetchUser({
			email: req.params.email,
			type: req.originalUrl,
		});

		// check if user exists and the email is verified
		if (user == null || user.email_verified != true) {
			response = {
				message: "Thanks, An Email with reset key will sent to this email",
				code: 200,
				success: false,
			};
			log.error("Requested User Is Not Found");
		} else {
			let resetKey = nanoid();
			user.passwordResetKey = resetKey;

			await sendMail({
				from: process.env.USER_EMAIL,
				to: user.email,
				subject: "Reset Your Password",
				text: `Hello, Please verify you account using the following code: ${resetKey}`,
			});

			response = {
				message: "Thanks, An Email with reset key will sent to this email",
				code: 200,
				success: true,
			};
		}
	} catch (error: { code?: number; message: string } | any) {
		response = {
			message: error.message,
			code: 500,
			success: false,
		};
	}
	res.status(response.code as number).json(response);
	next();
};

/* Reset Password */
export const resetPassword = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let response: ResponseInterface;
	try {
		// Get user by email
		let user = await fetchUser({
			email: req.params.email,
			type: req.originalUrl,
		});

		if (!user) {
			response = {
				message: "User not found",
				success: false,
				code: 400,
			};
		} else {
			if (user.passwordResetKey !== req.params.reset_key) {
				response = {
					message: "Invalid Reset Key",
					success: false,
					code: 400,
				};
			} else {
				response = {
					success: true,
					code: 200,
				};
			}
		}
	} catch (error: { message?: string; code?: number } | any) {
		response = {
			message: error.message,
			code: 500,
			success: false,
		};
	}
	res.status(response.code as number).json(response);
	next();
};

/* Confirm New Password */
export const confirmNewPassword = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let response: ResponseInterface;
	try {
		// Get user by email
		let user = await fetchUser({
			email: req.params.email,
			type: req.originalUrl,
		});

		if (!user) {
			response = {
				message: "User not found",
				success: false,
				code: 400,
			};
		} else {
			if (user.passwordResetKey !== req.params.reset_key) {
				response = {
					message: "Invalid Reset Key",
					success: false,
					code: 400,
				};
			} else {
				if (req.body.new_password !== req.body.config_new_password) {
					response = {
						success: false,
						code: 500,
						message: "Password Does Not Match",
					};
				} else {
					user.password = req.body.new_password;
					user.passwordResetKey = "";
					user.save();
					response = {
						success: true,
						code: 200,
						message: "Password Updated",
					};
				}
			}
		}
	} catch (error: { message?: string; code?: number } | any) {
		response = {
			message: error.message,
			code: 500,
			success: false,
		};
	}

	res.status(response.code as number).json(response);
	next();
};

/* Get Access Token */
export const getAccessToken = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	res.json();
	next();
};

/* Refresh Access Token */
export const refreshAccessToken = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	res.json();
	next();
};
