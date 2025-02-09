import { body } from "express-validator";

const productValidations = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("description").trim().notEmpty().withMessage("Description is required"),
  body("price")
    .isFloat({ min: 0.01 })
    .withMessage("Price must be a positive number"),
  body("category").trim().notEmpty().withMessage("Category is required"),
];
export default productValidations;
