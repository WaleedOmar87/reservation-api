import { Request, Response, NextFunction } from "express";
import { Review, Restaurant, User } from "@/models/index";
import { log } from "@/utils/logger";
import { ResponseInterface, ErrorInterface } from "@/types/index";

// Get all reviews
export const getAllReviews = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let response: ResponseInterface;
	try {
		const reviews = await Review.findAll();
		if (!reviews || reviews.length < 1) {
			throw {
				message: "No Reviews Were Found",
				code: 400,
				success: false,
			};
		}
		response = {
			data: reviews,
			message: "Reviews Found ",
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

// Get single review
export const getReviewByID = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let response: ResponseInterface;
	try {
		let { id } = req.params;
		const review = await Review.findByPK(id);
		if (!review) {
			throw {
				message: "Review Not Found",
				success: false,
				code: 400,
			};
		}
		response = {
			data: review,
			message: "Review were found",
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

// Create review
export const createReview = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let response: ResponseInterface;
	try {
		let { body } = req;
		let newReview = await Review.create({
			...body,
		});
		if (!newReview) {
			throw {
				message: "Failed To Create New Review",
				code: 500,
				successful: false,
			};
		}
		response = {
			message: "Review Created Successfully",
			success: true,
			code: 200,
		};
	} catch (Error: ResponseInterface | any) {
		response = Error;
	}
	res.status(response.code).json(response);
	next();
};

// Get restaurant reviews
export const getReviewWithRestaurant = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let response: ResponseInterface;
	try {
		let { id } = req.params;
		let reviewWithRestaurant = Review.findAll({
			where: {
				review_uid: id,
			},
			include: [
				{
					model: Restaurant,
					as: "Restaurant",
				},
			],
		});
		if (!reviewWithRestaurant) {
			throw {
				message: "Review not found",
				code: 400,
				success: false,
			};
		}
		response = {
			data: reviewWithRestaurant,
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

// Get reviews buy customer ID
export const getReviewWithCustomer = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let response: ResponseInterface;
	try {
		let { id } = req.params;
		let reviewWithCustomer = Review.findAll({
			where: {
				review_uid: id,
			},
			include: [
				{
					model: User,
					as: "User",
				},
			],
		});
		if (!reviewWithCustomer) {
			throw {
				message: "Cannot Find Review",
				code: 400,
				success: true,
			};
		}
		response = {
			data: reviewWithCustomer,
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

// Update review
export const updateReview = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let response: ResponseInterface;
	try {
		let { body } = req;
		let review = await Review.findByPk(body.id);
		if (!review) {
			throw {
				message: "Review Not Found",
				code: 400,
				success: false,
			};
		}
		await review.update({ ...body });
		await review.save();
		response = {
			message: "Review Updated Successfully",
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

// Delete review
export const deleteReview = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let response: ResponseInterface;
	try {
		let { body } = req;
		let review = await Review.findByPk(body.id);
		if (!review) {
			throw {
				message: "Review Not Found",
				success: false,
				code: 400,
			};
		}
		await review.destroy();
		response = {
			message: "Review Deleted Successfully",
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
