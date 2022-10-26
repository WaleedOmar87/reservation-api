import { createReservation , updateReservation } from "@/controllers/reservation";
const express = require('express')
import path from "path";

/* Initialize router */
const router = express.Router();

router.get("/create-reservation", createReservation as any);
router.get("/update-reservation/:id", updateReservation as any);

export default router;
