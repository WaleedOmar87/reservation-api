import { Request, Response, NextFunction } from "express";
import { Review, Restaurant, Customer } from "@/models/index";
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
			response = {
				message: "No Reviews Were Found",
				code: 400,
				success: false,
			};
		} else {
			response = {
				data: reviews,
				message: "Reviews Found ",
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

// Get single review
export const getReviewByID = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let response: ResponseInterface;
	try {
		const reviewID = req.body.id;
		const review = await Review.findByPK(reviewID);
		if (!review) {
			response = {
				message: "Review Not Found",
				success: false,
				code: 400,
			};
		} else {
			response = {
				data: review,
				message: "Review were found",
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

// Create review
export const createReview = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let response: ResponseInterface;
	try {
		let body = req.body;
		let newReview = await Review.create({
			...body,
		});
		response = {
			message: "Review Created Successfully",
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

// Get restaurant reviews
export const getReviewWithRestaurant = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let response: ResponseInterface;
	try {
		let reviewID = req.body.reviewID;
		let reviewWithRestaurant = Review.findAll({
			where: {
				review_uid: reviewID,
			},
			include: [
				{
					model: Restaurant,
					as: "Restaurant",
				},
			],
		});
		if (!reviewWithRestaurant) {
			response = {
				message: "Review not found",
				code: 400,
				success: false,
			};
		} else {
			response = {
				data: reviewWithRestaurant,
				success: true,
				code: 200,
			};
		}
	} catch (error: ErrorInterface | any) {
		log.error(error);
		response = {
			message: `Error: ${error.message}`,
			code: 500,
			success: false,
		};
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
		let reviewID = req.body.reviewID;
		let reviewWithCustomer = Review.findAll({
			where: {
				review_uid: reviewID,
			},
			include: [
				{
					model: Customer,
					as: "Customer",
				},
			],
		});
		if (!reviewWithCustomer) {
			response = {
				message: "Review not found",
				code: 400,
				success: false,
			};
		} else {
			response = {
				data: reviewWithCustomer,
				success: true,
				code: 200,
			};
		}
	} catch (error: ErrorInterface | any) {
		log.error(error);
		response = {
			message: `Error: ${error.message}`,
			code: 500,
			success: false,
		};
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
		const body = req.body;
		let review = await Review.findByPk(body.id);
		if (!review) {
			response = {
				message: "Review Not Found",
				code: 400,
				success: false,
			};
		} else {
			await review.update({ ...body });
			await review.save();
			response = {
				message: "Review Updated Successfully",
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

// Delete review
export const deleteReview = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let response: ResponseInterface;
	try {
		let body = req.body;
		let review = await Review.findByPk(body.id);
		if (!review) {
			response = {
				message: "Review Not Found",
				success: false,
				code: 400,
			};
		} else {
			await review.destroy();
			response = {
				message: "Review Deleted Successfully",
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
