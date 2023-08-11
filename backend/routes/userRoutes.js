import express from "express";
import {
  authUser,
  registerUser,
  allUser,
} from "../controller/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// "/" for both userRegistation and for chatSearch
router.route("/").post(registerUser).get(protect, allUser);
router.post("/login", authUser);

export default router;
