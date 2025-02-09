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

    const decoded = jwt.verify(token, "secret123");
    const loggedUser = await user.findById(decoded.userId);

    if (!loggedUser) {
      const error = new Error("User not found");
      error.statusCode = HttpStatus.NOT_FOUND;
      throw error;
    }

    req.user = loggedUser;
    next();
  } catch (error) {
    error.statusCode = error.statusCode || HttpStatus.UNAUTHORIZED;
    error.message = error.message || "Invalid or expired token";
    next(error);
  }
};

export default authMiddleware;
