import express from "express";
import { getVendorProfile } from "../controllers/vendor.controller.js";

const router = express.Router();

router.get("/:vendorId", getVendorProfile);

export default router;
