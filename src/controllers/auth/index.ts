import { NextFunction, Response, Request } from "express";
import fetchUser from "@/helpers/fetchUser";
import { ResponseInterface } from "@/types/index";
import { log } from "@/utils/logger";
import { nanoid } from "nanoid";
import { sendMail } from "@/utils/mailer";
import { signJWT } from "@/utils/jwt";
const bcrypt = require("bcryptjs");
import { Session, User } from "@/models/index";
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
			throw {
				message: "User Could Not Be Found",
				code: 400,
				success: false,
			};
		}
		if (user.emailValidationKey !== req.params.validationKey) {
			throw {
				message: "Invalid Key",
				code: 403,
				success: false,
			};
		}
		user.emailValidationKey = "";
		user.email_verified = true;
		user.save();
		response = {
			message: "User Updated",
			code: 200,
			success: true,
		};
	} catch (Error: ResponseInterface | any) {
		log.error(Error);
		response = Error;
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

		// Check if user exists and verified
		if (user == null || user.email_verified != true) {
			throw {
				message: "Thanks, An Email with reset key will sent to this email",
				code: 200,
				success: false,
			};
		}

		// Generate Reset Key
		let resetKey = nanoid();
		user.passwordResetKey = resetKey;

		// Send Reset Code To User's Email
		await sendMail({
			from: process.env.USER_EMAIL,
			to: user.email,
			subject: "Reset Your Password",
			text: `Hello, Please verify you account using the following code: ${resetKey}`,
		});

		response = {
			message:
				"We Will Send an Reset Code To Your Email If Your Email Exists",
			code: 200,
			success: true,
		};
	} catch (Error: ResponseInterface | any) {
		log.error(Error);
		response = Error;
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
			throw {
				message: "User Not Found",
				success: false,
				code: 404,
			};
		}
		if (user.passwordResetKey !== req.params.reset_key) {
			throw {
				message: "Invalid Key",
				success: false,
				code: 403,
			};
		}
		response = {
			success: true,
			code: 200,
			message: "User Updated",
		};
	} catch (Error: ResponseInterface | any) {
		log.error(Error);
		response = Error;
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
			throw {
				message: "User Not Found",
				success: false,
				code: 404,
			};
		}
		if (user.passwordResetKey !== req.params.reset_key) {
			throw {
				message: "Invalid Reset Key",
				success: false,
				code: 403,
			};
		}
		if (req.body.new_password !== req.body.config_new_password) {
			throw {
				success: false,
				code: 400,
				message: "Password Does Not Match",
			};
		}
		user.password = req.body.new_password;
		user.passwordResetKey = "";
		user.save();
		response = {
			success: true,
			code: 200,
			message: "Password Updated",
		};
	} catch (Error: ResponseInterface | any) {
		log.error(Error);
		response = Error;
	}
	res.status(response.code as number).json(response);
	next();
};

/* Create Login Session */
export const createSession = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let response: ResponseInterface = { code: 200 };
	try {
		const { user_email, user_password } = req.body;
		// Find User By Email
		let user = await User.findOne({
			where: {
				user_email: user_email,
			},
		});

		if (!user) {
			throw {
				code: 404,
				message: "User Not Found",
				successful: false,
			};
		}

		// Validate User Password
		let validatePassword = await bcrypt.compare(
			user_password,
			user.user_password
		);
		if (!validatePassword || validatePassword == null) {
			throw {
				code: 403,
				message: "Invalid Password",
				success: false,
			};
		}

		// Create Access Token Using User Data
		let accessToken = signJWT(user.toJSON(), "accessTokenPrivateKey", {
			expiresIn: "1d",
		});
		if (!accessToken) {
			throw {
				code: 500,
				message: "Unable To Sign JWT",
				success: false,
			};
		}

		// Create session
		const session = await Session.create({
			user: user.user_uid,
		});
		if (!session) {
			throw {
				code: 500,
				message: "Failed To Create Session",
				success: false,
			};
		}

		// Create Refresh Token With Session ID as a Reference
		let refreshToken = signJWT(
			{
				session: session.session_uid,
			},
			"refreshTokenPrivateKey",
			{
				expiresIn: "1y",
			}
		);

		if (!refreshToken) {
			throw {
				code: 500,
				message: "Unable To Sign RefreshToken",
				success: false,
			};
		}
		response = {
			code: 200,
			message: "Login Successfully",
			success: true,
			data: [{ accessToken: accessToken, refreshToken }],
		};
	} catch (Error: ResponseInterface | any) {
		log.error(Error);
		response = Error;
	}
	res.status(response.code).json(response);
	next();
};

/* Delete Session */
export const deleteSession = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	next();
};
