import { Request, Response, NextFunction } from "express";
import { ResponseInterface } from "@/types/index";
import { log } from "@/utils/logger";
import { validateJWT } from "@/utils/jwt";

/*
	Get Logged In User
	Get logged in user and attach user object to res.locals
*/
export const isAuth = (req: Request, res: Response, next: NextFunction) => {
	let response: ResponseInterface;
	try {
		// Get accessToken
		let authorization = req.headers.authorization;
		let accessToken = authorization
			? authorization.replace(/^Bearer\s/g, "")
			: "";
		if (accessToken == "") {
			throw {
				code: 403,
				message: "Unauthorized",
				success: false,
			};
		}

		// Deserialize Token and Get User Object
		let user = validateJWT(accessToken, "accessTokenPublicKey");
		if (!user) {
			throw {
				code: 500,
				message: "Unable To Validate Token",
				success: false,
			};
		}

		// Store User In Locals
		res.locals.user = user;

		response = {
			code: 200,
			message: "Validated",
			data: [{ ...(user as {}) }],
		};
	} catch (Error: ResponseInterface | any) {
		log.error(Error.message);
		response = Error;
	}

	if (response.code !== 200) {
		res.status(response.code).json(response);
	} else {
		next();
	}
};
