import express from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { validate } from "../middleware/errorMiddleware.js";
import productValidations from "../middleware/validators/productValidators.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/items",
  authMiddleware,
  validate(productValidations),
  createProduct
);

router.get("/items", getProducts);
router.get("/items/:id", getProductById);

router.put(
  "/items/:id",
  authMiddleware,
  validate(productValidations),
  updateProduct
);

router.delete("/items/:id", authMiddleware, deleteProduct);

export default router;
