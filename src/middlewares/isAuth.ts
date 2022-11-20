import { Request, Response, NextFunction } from "express";

/* Check auth_token and user_role, pass user_role */
export default (req: Request, res: Response, next: NextFunction) => {
	next();
};
