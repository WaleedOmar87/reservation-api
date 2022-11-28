import {
	getAllRestaurants,
	getRestaurantByID,
	getRestaurantsByOwnerID,
	createRestaurant,
	updateRestaurant,
	deleteRestaurant,
} from "@/controllers/restaurant";
import * as Express from "express";
import { checkUserRole } from "@/middlewares/index";

/* Initialize router */
const router: Express.Router = Express.Router();

router.get("/restaurant", getAllRestaurants);
router.get("/restaurant/:id", getRestaurantByID);
router.get("/restaurant/byowner/:id", getRestaurantsByOwnerID);
router.post(
	"/restaurant",
	checkUserRole(["admin", "owner", "staff"]),
	createRestaurant
);
router.patch(
	"/restaurant",
	checkUserRole(["admin", "owner", "staff"]),
	updateRestaurant
);
router.delete(
	"/restaurant",
	checkUserRole(["admin", "owner", "staff"]),
	deleteRestaurant
);

export default router;
