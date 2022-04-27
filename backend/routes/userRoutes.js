import express from "express";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";
import {
  authUser,
  registerUser,
  getUserProfile,
  verifyUserEmail,
  verifyAccount,
} from "../controllers/userController.js";

//Route /api/users
router.route("/").post(registerUser);
router.post("/login", authUser);
router.post("/verify", protect, verifyUserEmail);
router.get("/verify/:token", protect, verifyAccount);
router.route("/profile").get(protect, getUserProfile);

export default router;
