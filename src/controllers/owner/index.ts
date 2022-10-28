import { NextFunction, Response, Request } from "express";
import { Owner } from "@/models/index";

/* Get all owners */
export const getAllOwners = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const getOwners = await Owner.findAll();
	res.json({
		data: getOwners,
	});
	next();
};

/* Get single owner */
export const getOwnerByID = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const getOwnerID: string = req.params.id;
	const fetchOwner = await Owner.findByPk(getOwnerID);
	res.json({
		ownerID: fetchOwner,
	});
	next();
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
		password: "1234567",
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
