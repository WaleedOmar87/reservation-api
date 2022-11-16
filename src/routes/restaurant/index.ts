import {
	getAllRestaurants,
	getRestaurantByID,
	getRestaurantsByOwnerID,
	createRestaurant,
	updateRestaurant,
	deleteRestaurant,
} from "@/controllers/restaurant";
import * as Express from "express";

/* Initialize router */
const router: Express.Router = Express.Router();

router.get("/restaurant", getAllRestaurants);
router.get("/restaurant/:id", getRestaurantByID);
router.get("/restaurant/byowner/:id", getRestaurantsByOwnerID);
router.post("/restaurant", createRestaurant);
router.patch("/restaurant", updateRestaurant);
router.delete("/restaurant", deleteRestaurant);

export default router;
