import express from "express";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";
import { getLists, getListById } from "../controllers/listController.js";

//Route /api/lists
router.route("/").get(protect, getLists);
router.route("/:id").get(protect, getListById);

export default router;
