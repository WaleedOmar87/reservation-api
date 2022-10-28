import {
	getAllRestaurants,
	getRestaurantByID,
	getRestaurantByOwnerID,
	createRestaurant,
	updateRestaurant,
	deleteRestaurant,
} from "@/controllers/restaurant";
import * as Express from "express";

/* Initialize router */
const router: Express.Router = Express.Router();

router.get("/reservation/all", getAllRestaurants);
router.get("/reservation/:id", getRestaurantByID);
router.get("/restaurant/owner_id/:id", getRestaurantByOwnerID);
router.post("/restaurant", createRestaurant);
router.patch("/restaurant/:id", updateRestaurant);
router.delete("/restaurant/:id", deleteRestaurant);

export default router;
