import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
} from "../controllers/userController.js";
import { validate } from "../middleware/errorMiddleware.js";
import {
  registerValidations,
  loginValidations,
} from "../middleware/validators/userValidators.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/auth/register", validate(registerValidations), registerUser);
router.post("/auth/login", validate(loginValidations), loginUser);
router.get("/profile", authMiddleware, getProfile);

export default router;
