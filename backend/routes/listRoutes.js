import express from "express";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";
import {
  getLists,
  getListById,
  addList,
} from "../controllers/listController.js";

//Route /api/lists
router.route("/").get(protect, getLists).post(protect, addList);
router.route("/:id").get(protect, getListById);

export default router;
