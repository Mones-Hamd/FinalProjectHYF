import mongoose from "mongoose";

import validateAllowedFields from "../util/validateAllowedFields.js";

const userSchema = new mongoose.Schema({
  username: { type: String },
  email: { type: String, required: true, unique: true },
  // password: { type: String, required: true },
  hash: String,
  salt: String,
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
