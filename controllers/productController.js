import product from "../model/productModel.js";
import { HttpStatus } from "../utils/httpStatus.js";

export const createProduct = async (req, res, next) => {
  try {
    const { name, description, price, category } = req.body;

    // Get sequential ID
    const lastProduct = await product.findOne().sort({ id: -1 });
    const id = lastProduct ? lastProduct.id + 1 : 1;

    const newProduct = await product.create({
      id,
      name,
      description,
      price,
      category,
    });

    res.status(HttpStatus.CREATED).json({
      data: newProduct,
      message: "Product created successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getProducts = async (req, res, next) => {
  try {
    // Check for pagination parameters
    const usePagination = req.query.page || req.query.limit;

    if (usePagination) {
      // Pagination configuration
      const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
      const limit = Math.min(
        Math.max(parseInt(req.query.limit, 10) || 10, 1),
        100
      );
      const skip = (page - 1) * limit;

      // Parallel execution for better performance
      const [products, totalItems] = await Promise.all([
        product.find().sort({ id: 1 }).skip(skip).limit(limit).select("-__v"),
        product.countDocuments(),
      ]);

      const totalPages = Math.ceil(totalItems / limit);

      res.status(HttpStatus.OK).json({
        items: products,
        total: totalItems,
        page: page,
        totalPages: totalPages,
      });
    } else {
      // Full dataset retrieval
      const products = await product.find().sort({ id: 1 }).select("-__v");

      res.status(HttpStatus.OK).json({
        items: products,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const productItem = await product.findOne({ id: req.params.id });

    if (!productItem) {
      const error = new Error("Product not found");
      error.statusCode = HttpStatus.NOT_FOUND;
      throw error;
    }

    res.status(HttpStatus.OK).json({
      data: productItem,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const updatedProduct = await product.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      const error = new Error("Product not found");
      error.statusCode = HttpStatus.NOT_FOUND;
      throw error;
    }

    res.status(HttpStatus.OK).json({
      success: true,
      data: updatedProduct,
      message: "Product updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const deletedProduct = await product.findOneAndDelete({
      id: req.params.id,
    });

    if (!deletedProduct) {
      const error = new Error("Product not found");
      error.statusCode = HttpStatus.NOT_FOUND;
      throw error;
    }

    res.status(HttpStatus.OK).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
