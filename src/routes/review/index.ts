import {
	getReviewByID,
	getAllReviews,
	getReviewWithCustomer,
	getReviewWithRestaurant,
	createReview,
	updateReview,
	deleteReview,
} from "@/controllers/review";
import { checkUserRole } from "@/middlewares/checkUserRole";
import * as Express from "express";

/* Initialize router */
const router: Express.Router = Express.Router();

router.get("/review", getAllReviews);
router.get("/review/:id", getReviewByID);
router.get("/review/withcustomer/:id", getReviewWithCustomer);
router.get("/review/withrestaurant/:id", getReviewWithRestaurant);
router.post(
	"/review/",
	checkUserRole(["admin", "staff", "customer"]),
	createReview
);
router.patch(
	"/review",
	checkUserRole(["admin", "staff", "customer"]),
	updateReview
);
router.delete("/review", checkUserRole(["admin", "staff"]), deleteReview);

export default router;
