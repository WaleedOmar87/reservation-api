import { createOwner, updateOwner } from "src/controllers/owner";
import express from "express";
import path from "path";

/* Initialize router */
const router = express.Router();

router.get("/create-owner", createOwner as any);
router.get("/update-owner/:id", updateOwner as any);

export default router;
