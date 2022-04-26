import express from "express";
const router = express.Router();
import { getLists, getListById } from "../controllers/listController.js";

//Route /api/lists
router.route("/").get(getLists);
router.route("/:id").get(getListById);

export default router;
