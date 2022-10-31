import { NextFunction, Response, Request } from "express";
import fetchUser from "@/helpers/fetchUser";

/* Verify Email Address */
export const verifyEmailAddress = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		// Get user and response from fetchUser helper
		let [user, response] = await fetchUser({
			id: req.params.id,
			type: req.originalUrl,
			validationKey: req.params.validation_key,
		});

		// If user is found and validation key is valid
		if (response.success) {
			user.emailValidationKey = "";
			user.email_verified = true;
			user.save();
		}
		res.json(response);
	} catch (error: { message?: string; code?: number } | any) {
		res.status(500).json({
			message: error.message,
		});
	}
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
