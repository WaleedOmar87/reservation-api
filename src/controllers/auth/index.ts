import { NextFunction, Response, Request } from "express";

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
