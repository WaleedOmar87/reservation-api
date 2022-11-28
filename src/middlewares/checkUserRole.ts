import { Request, Response, NextFunction } from "express";
import { ResponseInterface } from "@/types/index";
import { log } from "@/utils/logger";

/* Check User Role */
export const checkUserRole = (userRoles: string[]) => {
	return (req: Request, res: Response, next: NextFunction) => {
		let response: ResponseInterface = { code: 500 };
		try {
			// Get current user
			let { user_role, user_uid } = res.locals.user;
			if (!user_uid || userRoles.indexOf(user_role) == -1) {
				throw {
					code: 403,
					message: "User Does Not Have Permission To This Task.",
					success: false,
				};
			}
			response = {
				code: 200,
				message: "Validated",
				success: false,
			};
		} catch (Error: ResponseInterface | any) {
			response = Error;
			log.error(Error);
		}
		if (response.code !== 200) {
			res.status(response.code).json(response);
		} else {
			next();
		}
	};
};
