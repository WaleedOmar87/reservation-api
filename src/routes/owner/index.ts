import { createOwner, updateOwner, getOwner , deleteOwner } from "@/controllers/owner";
const express = require("express");
import path from "path";

/* Initialize router */
const router = express.Router();

router.get("/owner", getOwner as any);
router.post("/owner", createOwner as any);
router.patch("/owner/:id", updateOwner as any);
router.delete("/owner/:id", deleteOwner as any);

export default router;
