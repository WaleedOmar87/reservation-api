import { NextFunction, Response, Request } from "express";
export default (req: Request, res: Response, next: NextFunction) => {
	/* Validate Resources */
	next();
};
