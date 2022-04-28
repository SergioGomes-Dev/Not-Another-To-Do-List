import express from "express";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";
import {
  authUser,
  registerUser,
  verifyUserEmail,
  verifyAccount,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController.js";

//Route /api/users
router.route("/").post(registerUser);
router.post("/login", authUser);
router.post("/verify", protect, verifyUserEmail);
router.get("/verify/:token", protect, verifyAccount);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;
