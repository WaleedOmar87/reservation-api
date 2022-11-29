import { NextFunction, Response, Request } from "express";
export const validateResources = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	/* Validate Resources */
	next();
};
