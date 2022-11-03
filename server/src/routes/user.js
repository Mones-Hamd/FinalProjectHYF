import express from "express";
import passport from "passport";
import {
  createUser,
  getUsers,
  register,
  login,
  verifyAccount,
  forgotPassword,
  updatePassword,
} from "../controllers/user.js";

const userRouter = express.Router();

userRouter.get("/", passport.authenticate("jwt", { session: false }), getUsers);
userRouter.post("/create", createUser);
userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/verify", verifyAccount);
userRouter.get("/forgotPassword", forgotPassword);
userRouter.post("/updatePassword", updatePassword);

export default userRouter;
