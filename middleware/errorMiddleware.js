import { validationResult } from "express-validator";
import { HttpStatus, HttpMessage } from "../utils/httpStatus.js";

export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  if (err.name === "UnauthorizedError") {
    return res.status(HttpStatus.UNAUTHORIZED).json({
      message: err.message || "Authentication failed",
    });
  }

  // Handle validation errors
  if (err.errors && Array.isArray(err.errors)) {
    return res.status(HttpStatus.BAD_REQUEST).json({
      errors: err.errors,
    });
  }

  // Handle custom thrown errors
  const statusCode = err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
  const message = err.message || HttpMessage[statusCode];

  res.status(statusCode).json({
    message,
  });
};

export function validate(validations) {
  return async function (req, res, next) {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) return next();

    const errorMessages = errors.array().map((err) => ({
      message: err.msg,
    }));

    res.status(HttpStatus.BAD_REQUEST).json({
      errors: errorMessages,
    });
  };
}
