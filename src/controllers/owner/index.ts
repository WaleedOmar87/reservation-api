import { NextFunction, Response, Request } from "express";
import { Owner } from "@/models/index";

export const getOwner = (req: Request, res: Response, next: NextFunction) => {
	res.json({
		message: "hello ",
	});
};
export const createOwner = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	Owner.create({
		owner_name: "Waleed" as any,
		owner_address: "Somewhere",
		phone_number: "332432242" as any,
		email: "waleed2@gmail.com",
	});
	next();
};

export const updateOwner = (
	req: Request,
	res: Response,
	next: NextFunction
) => {};

export const deleteOwner = (
	req: Request,
	res: Response,
	next: NextFunction
) => {};
