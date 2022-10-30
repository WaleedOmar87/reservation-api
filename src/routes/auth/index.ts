import { getAccessToken, refreshAccessToken } from "@/controllers/auth";
import * as Express from "express";

/* Initialize router */
const router: Express.Router = Express.Router();

router.get("/auth", getAccessToken);
router.post("/auth/:token", refreshAccessToken);

export default router;
