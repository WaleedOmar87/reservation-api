import { Restaurant, User } from "@/models/index";
import { NextFunction, Response, Request } from "express";
import { log } from "@/utils/logger";
import { ResponseInterface, ErrorInterface } from "@/types/index";

// Get all restaurants
export const getAllRestaurants = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let response: ResponseInterface;
	try {
		const restaurant = await Restaurant.findAll();
		if (!restaurant || restaurant.length < 1) {
			response = {
				message: "No Restaurants Were Found",
				code: 400,
				success: false,
			};
		} else {
			response = {
				data: restaurant,
				message: "Restaurants Found ",
				code: 200,
				success: true,
			};
		}
	} catch (error: ErrorInterface | any) {
		log.error(error);
		response = {
			message: `Unexpected Error: ${error.message}`,
			code: 500,
			success: false,
		};
	}
	res.status(response.code).json(response);
	next();
};

// Get restaurant by id
export const getRestaurantByID = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let response: ResponseInterface;
	try {
		let { id } = req.params;
		const restaurant = await Restaurant.findAll({
			where: {
				restaurant_uid: id,
			},
		});
		if (!restaurant) {
			response = {
				message: "Restaurant Not Found",
				success: false,
				code: 400,
			};
		} else {
			response = {
				data: restaurant,
				message: "Restaurant were found",
				code: 200,
				success: true,
			};
		}
	} catch (error: ErrorInterface | any) {
		log.error(error);
		response = {
			message: `Error: ${error.message}`,
			success: false,
			code: 500,
		};
	}
	res.status(response.code).json(response);
	next();
};

// Get restaurants by owner id
export const getRestaurantsByOwnerID = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let response: ResponseInterface;
	try {
		let { id } = req.params;
		let restaurants = await Restaurant.findAll({
			where: {
				owner_uid: id,
			},
			include: {
				model: User,
				as: "User",
			},
		});
		if (!restaurants || restaurants.length < 1) {
			throw {
				message: "No Restaurants Found",
				code: 400,
				success: false,
			};
		}
		response = {
			message: `Found All Restaurants Belongs To ${restaurants[0].Owner.owner_name}`,
			data: restaurants,
			code: 200,
			success: true,
		};
	} catch (Error: ResponseInterface | any) {
		log.error(Error);
		response = Error;
	}
	res.status(response.code).json(response);
	next();
};

// Create restaurant
export const createRestaurant = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let response: ResponseInterface;
	try {
		let { body } = req;
		let newRestaurant = await Restaurant.create({
			...body,
		});
		if (!newRestaurant) {
			throw {
				message: "Failed To Create New Restaurant",
				code: 500,
				successful: false,
			};
		}
		response = {
			message: "Restaurant Created Successfully",
			success: true,
			code: 200,
		};
	} catch (Error: ResponseInterface | any) {
		log.error(Error);
		response = Error;
	}
	res.status(response.code).json(response);
	next();
};

// update restaurant
export const updateRestaurant = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let response: ResponseInterface;
	try {
		let { body } = req;
		let restaurant = await Restaurant.findByPk(body.id);
		if (!restaurant) {
			throw {
				message: "Restaurant Not Found",
				code: 400,
				success: false,
			};
		}
		await restaurant.update({ ...body });
		await restaurant.save();
		response = {
			message: "Restaurant Updated Successfully",
			code: 200,
			success: true,
		};
	} catch (Error: ResponseInterface | any) {
		response = Error;
	}
	res.status(response.code).json(response);
	next();
};

// delete restaurant
export const deleteRestaurant = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let response: ResponseInterface;
	try {
		let { body } = req;
		let restaurant = await Restaurant.findByPk(body.id);
		if (!restaurant) {
			throw {
				message: "Restaurant Not Found",
				success: false,
				code: 400,
			};
		}
		await restaurant.destroy();
		response = {
			message: "Restaurant Deleted Successfully",
			code: 200,
			success: true,
		};
	} catch (Error: ResponseInterface | any) {
		log.error(Error);
		response = Error;
	}
	res.status(response.code).json(response);
	next();
};
