import express from "express";
// import passport from "passport";
import {
  register,
  login,
  verifyAccount,
  forgotPassword,
  updatePassword,
  verifyUrl,
} from "../controllers/user.js";

const userRouter = express.Router();

// userRouter.get("/", passport.authenticate("jwt", { session: false }), "Hello world");
userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/:id/verify/:token/", verifyAccount);
userRouter.post("/forgotPassword", forgotPassword);
userRouter.get("/:id/reset/:token", verifyUrl);
userRouter.post("/:id/reset/:token", updatePassword);
export default userRouter;
