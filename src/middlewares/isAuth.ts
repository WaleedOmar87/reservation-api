import { Request, Response, NextFunction } from "express";
import { ResponseInterface } from "@/types/index";
import { log } from "@/utils/logger";
import { validateJWT } from "@/utils/jwt";

/*
	Get Logged In User
	Get logged in user and attach user object to res.locals
*/
export default (req: Request, res: Response, next: NextFunction) => {
	let response: ResponseInterface = { code: 200 };
	try {
		// Get accessToken
		let authorization = req.headers.authorization;
		let accessToken = authorization
			? authorization.replace(/^Bearer\s/g, "")
			: "";
		if (!accessToken) {
			response = {
				code: 403,
				message: "Unauthorized",
				success: false,
			};
		}
		// Deserialize Token and Get User Object
		let user = validateJWT(accessToken, "accessTokenPublicsKey");

		// Store User In Locals
		res.locals.user = user;

		response = {
			code: 200,
			message: "Validated",
			data: [{ ...(user as {}) }],
		};
	} catch (error: any) {
		log.error(error);
	}

	if (response.code !== 200) {
		res.status(response.code).json(response);
	} else {
		next();
	}
};
