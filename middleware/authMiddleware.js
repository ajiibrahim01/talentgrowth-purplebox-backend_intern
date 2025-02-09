import jwt from "jsonwebtoken";
import { HttpStatus } from "../utils/httpStatus.js";
import user from "../model/userModel.js";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      const error = new Error("Authorization token required");
      error.statusCode = HttpStatus.UNAUTHORIZED;
      throw error;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const loggedUser = await user.findById(decoded.userId);

    if (!loggedUser) {
      const error = new Error("User not found");
      error.statusCode = HttpStatus.NOT_FOUND;
      throw error;
    }

    req.user = loggedUser;
    next();
  } catch (error) {
    // Handle JWT specific errors
    if (error.name === "TokenExpiredError") {
      error.message = "Token expired";
      error.statusCode = HttpStatus.UNAUTHORIZED;
    }
    if (error.name === "JsonWebTokenError") {
      error.message = "Invalid token";
      error.statusCode = HttpStatus.UNAUTHORIZED;
    }

    error.statusCode = error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
    next(error);
  }
};

export default authMiddleware;
