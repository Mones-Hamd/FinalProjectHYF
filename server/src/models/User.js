import mongoose from "mongoose";

import validateAllowedFields from "../util/validateAllowedFields.js";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  salt: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  isVerified: { type: Boolean, default: false },
  lastLoginDate: { type: Date, default: new Date() },
});

const User = mongoose.model("users", userSchema);

export const validateRegisterUser = (userObject) => {
  const errorList = [];
  const allowedKeys = ["username", "email", "password"];

  const validatedKeysMessage = validateAllowedFields(userObject, allowedKeys);

  if (validatedKeysMessage.length > 0) {
    errorList.push(validatedKeysMessage);
  }

  if (userObject.username == null) {
    errorList.push("name is a required field");
  } else if (!validateUsername(userObject.username)) {
    errorList.push("Username is invalid");
  }

  if (userObject.email == null) {
    errorList.push("email is a required field");
  } else if (!validateEmail(userObject.email)) {
    errorList.push("Email is invalid");
  }

  if (userObject.password == null) {
    errorList.push("password is a required field");
  } else if (!validatePassword(userObject.password)) {
    errorList.push(
      "Password must be 8 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character(#?!@$%^&*-)"
    );
  }

  return errorList;
};

export const validateLoginUser = (userObject) => {
  const errorList = [];
  const allowedKeys = ["email", "password"];

  const validatedKeysMessage = validateAllowedFields(userObject, allowedKeys);

  if (validatedKeysMessage.length > 0) {
    errorList.push(validatedKeysMessage);
  }

  if (userObject.email == null) {
    errorList.push("email is a required field");
  } else if (!validateEmail(userObject.email)) {
    errorList.push("Email is invalid");
  }

  if (userObject.password == null) {
    errorList.push("password is a required field");
  } else if (!validatePassword(userObject.password)) {
    errorList.push(
      "Password must be 8 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character(#?!@$%^&*-)"
    );
  }

  return errorList;
};

const validateUsername = (username) => {
  const regex = new RegExp(/^[A-Za-z0-9]{3,16}$/);
  return regex.test(username);
};

const validateEmail = (email) => {
  const regex = new RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  return regex.test(email);
};

const validatePassword = (password) => {
  const regex = new RegExp(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-.]).{8,20}$/
  );
  return regex.test(password);
};

export default User;
