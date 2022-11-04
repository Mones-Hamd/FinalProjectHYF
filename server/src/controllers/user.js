import User, {
  validateRegisterUser,
  validateLoginUser,
} from "../models/User.js";
import { logError } from "../util/logging.js";
import validationErrorMessage from "../util/validationErrorMessage.js";
import { hashPassword, validatePassword, signJWT } from "../security/auth.js";
import { sendVerificationMail } from "../services/mailService.js";
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
    const verificationCode = await createVerificationCode(user);

    await sendVerificationMail(
      user.email,
      "Verify Email",
      verificationCode.url
    );

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

export const forgotPassword = () => {
  // TODO it will send email with a link that contains a unique code as a query parameter,
  // TODO this code will also be saved to the db with expiration date.
};

export const updatePassword = () => {
  // TODO it will get code and new password from the body of the request,
  // TODO check the code from db, if it is available and not expired then update the password
};

const createVerificationCode = async (user) => {
  const verificationToken = await new Token({
    userId: user._id,
    token: crypto.randomBytes(32).toString("hex"),
  }).save();
  const url = `localhost:5000/api/user/${user._id}/verify/${verificationToken.token}`;
  return {
    code: verificationToken,
    url,
  };
};
