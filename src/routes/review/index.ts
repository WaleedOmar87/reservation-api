import {
	getReviewByID,
	getAllReviews,
	getReviewsByCustomerID,
	getReviewsByRestaurantID,
	createReview,
	updateReview,
	deleteReview,
} from "@/controllers/review";
import * as Express from "express";

/* Initialize router */
const router: Express.Router = Express.Router();

router.get("/review/all", getAllReviews);
router.get("/review/:id", getReviewByID);
router.get("/review/by_customer/:id", getReviewsByCustomerID);
router.get("/review/by_restaurant_id", getReviewsByRestaurantID);
router.post("/review/", createReview);
router.patch("/review/:id", updateReview);
router.delete("/review/:id", deleteReview);

export default router;
