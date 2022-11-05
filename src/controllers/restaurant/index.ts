import { Restaurant } from "@/models/index";
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
		const restaurantID = req.body.id;
		const restaurant = await restaurantID.findByPK(restaurantID);
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
) => {};

// Create restaurant
export const createRestaurant = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let response: ResponseInterface;
	try {
		let body = req.body;
		let newRestaurant = await Restaurant.create({
			...body,
		});

		response = {
			message: "Restaurant Created Successfully",
			success: true,
			code: 200,
		};
	} catch (error: ErrorInterface | any) {
		response = {
			message: error.message,
			success: true,
			code: 500,
		};
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
		const body = req.body;
		let restaurant = await Restaurant.findByPk(body.id);
		if (!restaurant) {
			response = {
				message: "Restaurant Not Found",
				code: 400,
				success: false,
			};
		} else {
			await restaurant.update({ ...body });
			await restaurant.save();
			response = {
				message: "Restaurant Updated Successfully",
				code: 200,
				success: true,
			};
		}
	} catch (error: ErrorInterface | any) {
		response = {
			message: `Error: ${error.message}`,
			code: 500,
			success: false,
		};
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
		let body = req.body;
		let restaurant = await Restaurant.findByPk(body.id);
		if (!restaurant) {
			response = {
				message: "Restaurant Not Found",
				success: false,
				code: 400,
			};
		} else {
			await restaurant.destroy();
			response = {
				message: "Restaurant Deleted Successfully",
				code: 200,
				success: true,
			};
		}
	} catch (error: ErrorInterface | any) {
		response = {
			message: `Error: ${error.message}`,
			code: 500,
			success: false,
		};
	}
	res.status(response.code).json(response);
	next();
};
