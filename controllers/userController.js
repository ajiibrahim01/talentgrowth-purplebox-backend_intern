import user from "../model/userModel.js";
import jwt from "jsonwebtoken";
import { HttpStatus } from "../utils/httpStatus.js";

export const registerUser = async (req, res, next) => {
  try {
    const { name, age, email, password } = req.body;
    const newUser = new user({ name, age, email });
    await newUser.setPassword(password);
    await newUser.save();
    res.status(HttpStatus.CREATED).json({
      message: "User registered successfully",
    });
  } catch (error) {
    next(error);
  }
};
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const loggedUser = await user.findOne({ email });

    if (!loggedUser) {
      const error = new Error("Invalid credentials");
      error.statusCode = HttpStatus.UNAUTHORIZED;
      throw error;
    }

    const isValid = await loggedUser.validatePassword(password);
    if (!isValid) {
      const error = new Error("Invalid credentials");
      error.statusCode = HttpStatus.UNAUTHORIZED;
      throw error;
    }

    const token = jwt.sign({ userId: loggedUser._id }, "secret123", {
      expiresIn: "1h",
    });

    res.status(HttpStatus.OK).json({
      token,
    });
  } catch (error) {
    next(error);
  }
};
export const getProfile = async (req, res, next) => {
  try {
    const user = req.user;
    res.status(HttpStatus.OK).json({
      data: {
        name: user.name,
        age: user.age,
      },
    });
  } catch (error) {
    next(error);
  }
};
