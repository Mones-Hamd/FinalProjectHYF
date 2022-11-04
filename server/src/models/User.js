import mongoose from "mongoose";

import validateAllowedFields from "../util/validateAllowedFields.js";

const verificationCodeSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  expiredIn: { type: Date, required: true },
});

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  hash: { type: String, required: true },
  salt: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  isVerified: { type: Boolean, default: false },
  lastLoginDate: { type: Date, default: new Date() },
  verificationCode: { type: verificationCodeSchema },
});

const User = mongoose.model("users", userSchema);

export const validateUser = (userObject) => {
  const errorList = [];
  const allowedKeys = ["name", "email"];

  const validatedKeysMessage = validateAllowedFields(userObject, allowedKeys);

  if (validatedKeysMessage.length > 0) {
    errorList.push(validatedKeysMessage);
  }

  if (userObject.name == null) {
    errorList.push("name is a required field");
  }

  if (userObject.email == null) {
    errorList.push("email is a required field");
  }

  return errorList;
};

export default User;
