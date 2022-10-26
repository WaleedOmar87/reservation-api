import { NextFunction, Response, Request } from "express";
import { Owner } from "@/models/index";

export const getOwner = (req: Request, res: Response, next: NextFunction) => {
	Owner.find();
};
export const createOwner = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	Owner.create({
		owner_name: "Waleed" as any,
		owner_address: "Somewhere",
		phone_number: "01119999999" as any,
		email: "waleed@gmail.com",
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
