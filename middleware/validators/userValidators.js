import { body } from "express-validator";
import user from "../../model/userModel.js";

export const registerValidations = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("age").isInt({ min: 1 }).withMessage("Age must be a positive integer"),
  body("email")
    .isEmail()
    .withMessage("Invalid email")
    .normalizeEmail()
    .custom(async (value) => {
      const exists = await user.findOne({ email: value });
      if (exists) throw new Error("Email already registered");
    }),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

export const loginValidations = [
  body("email").isEmail().withMessage("Invalid email").normalizeEmail(),
  body("password").notEmpty().withMessage("Password is required"),
];
