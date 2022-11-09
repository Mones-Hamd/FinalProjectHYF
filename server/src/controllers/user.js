import User, {
  validateRegisterUser,
  validateLoginUser,
} from "../models/User.js";
import { logError } from "../util/logging.js";
import validationErrorMessage from "../util/validationErrorMessage.js";
import { hashPassword, validatePassword, signJWT } from "../security/auth.js";
import { sendMail } from "../services/mailService.js";
import crypto from "crypto";
import Token from "../models/Token.js";

export const register = async (req, res) => {
  const errorList = validateRegisterUser(req.body);

  if (errorList.length > 0) {
    res
      .status(400)
      .json({ success: false, msg: validationErrorMessage(errorList) });
    return;
  }

  if (await isEmailExists(req.body.email)) {
    res.status(400).json({ success: false, msg: "Email is already exists" });
    return;
  }

  if (await isUsernameExists(req.body.username)) {
    res.status(400).json({ success: false, msg: "Username is already exists" });
    return;
  }

  const saltHash = hashPassword(req.body.password);

  const salt = saltHash.salt;
  const password = saltHash.hash;

  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password,
    salt,
    isVerified: false,
    isActive: true,
  });

  try {
    const user = await newUser.save();

    const token = await createToken(user);
    const url = `${process.env.CLIENT_HOST}:${process.env.CLIENT_PORT}/verifyAccount/user/${user._id}/token/${token.token}`;
    await sendMail({
      type: "VERIFY_ACCOUNT",
      subject: "Verify Email",
      email: user.email,
      username: user.username,
      url: url,
    });

    const jwtToken = signJWT(user);
    res.status(201).json({
      success: true,
      token: jwtToken,
      message: "An Email sent to your account please verify",
    });
  } catch (err) {
    logError(err);
    res.json({ success: false, msg: err });
  }
};

export const login = async (req, res, next) => {
  try {
    const errorList = validateLoginUser(req.body);

    if (errorList.length > 0) {
      res
        .status(400)
        .json({ success: false, msg: validationErrorMessage(errorList) });
      return;
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, msg: "could not find user" });
    }

    const isValid = validatePassword(
      req.body.password,
      user.password,
      user.salt
    );

    if (isValid) {
      const jwtToken = signJWT(user);

      res.status(200).json({
        success: true,
        token: jwtToken,
      });
    } else {
      res
        .status(401)
        .json({ success: false, msg: "Email or password is incorrect" });
    }
  } catch (err) {
    next(err);
  }
};

export const verifyAccount = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });

    if (!user) return res.status(400).send({ message: "Invalid link" });

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) return res.status(400).send({ message: "Invalid link" });

    await User.findByIdAndUpdate(user._id, { isVerified: true });
    await token.remove();

    res.status(200).send({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user)
      return res
        .status(409)
        .send({ message: "User with given email does not exist!" });

    let token = await Token.findOne({ userId: user._id });
    if (!token) {
      token = await createToken(user);
    }
    const url = `${process.env.CLIENT_HOST}:${process.env.CLIENT_PORT}/forgetPassword/user/${user._id}/reset/${token.token}/`;
    await sendMail({
      type: "UPDATE_PASSWORD",
      subject: "Password Reset",
      email: user.email,
      username: user.username,
      url: url,
    });

    res
      .status(200)
      .send({ message: "Password reset link sent to your email account" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

export const verifyUrl = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send({ message: "Invalid link" });

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) return res.status(400).send({ message: "Invalid link" });

    res.status(200).send("Valid Url");
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send({ message: "Invalid link" });

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) return res.status(400).send({ message: "Invalid link" });

    if (!user.verified) user.verified = true;

    const saltHash = hashPassword(req.body.password);

    const salt = saltHash.salt;
    const password = saltHash.hash;

    user.password = password;
    user.salt = salt;
    await user.save();
    await token.remove();

    res.status(200).send({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const createToken = async (user) => {
  return await new Token({
    userId: user._id,
    token: crypto.randomBytes(32).toString("hex"),
  }).save();
};

const isEmailExists = async (email) => {
  return await User.findOne({ email: email });
};

const isUsernameExists = async (username) => {
  return await User.findOne({ username: username });
};
