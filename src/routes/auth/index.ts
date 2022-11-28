import * as Express from "express";
import { createSession } from "@/controllers/auth";
import { createUser } from "@/controllers/user";

/* Initialize router */
const router: Express.Router = Express.Router();

router.post("/auth/register", createUser);
router.post("/auth/login", createSession);

export default router;
