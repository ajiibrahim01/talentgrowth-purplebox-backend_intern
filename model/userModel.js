import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    hash: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

userSchema.methods.setPassword = async function (password) {
  const salt = await bcrypt.genSalt(10);
  this.hash = await bcrypt.hash(password, salt);
};
userSchema.methods.validatePassword = async function (password) {
  return await bcrypt.compare(password, this.hash);
};

export default model("user", userSchema);
