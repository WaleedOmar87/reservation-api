import {
	getReviewByID,
	getAllReviews,
	getReviewWithCustomer,
	getReviewWithRestaurant,
	createReview,
	updateReview,
	deleteReview,
} from "@/controllers/review";
import * as Express from "express";

/* Initialize router */
const router: Express.Router = Express.Router();

router.get("/review/all", getAllReviews);
router.get("/review/:id", getReviewByID);
router.get("/review/withcustomer/:id", getReviewWithCustomer);
router.get("/review/withrestaurant/:id", getReviewWithRestaurant);
router.post("/review/", createReview);
router.patch("/review", updateReview);
router.delete("/review", deleteReview);

export default router;
