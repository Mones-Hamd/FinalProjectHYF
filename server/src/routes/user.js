import express from "express";
// import passport from "passport";
import {
  register,
  login,
  verifyAccount,
  forgotPassword,
  updatePassword,
} from "../controllers/user.js";

const userRouter = express.Router();

// userRouter.get("/", passport.authenticate("jwt", { session: false }), "Hello world");
userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/:id/verify/:token/", verifyAccount);
userRouter.get("/forgotPassword", forgotPassword);
userRouter.post("/updatePassword", updatePassword);

export default userRouter;
