import { v4 as uuidv4 } from "uuid";
import User, { validateUser } from "../models/User.js";
import { logError } from "../util/logging.js";
import validationErrorMessage from "../util/validationErrorMessage.js";
import { genPassword, validPassword, issueJWT } from "../util/jwt.js";
import { sendVerificationMail } from "../services/mailService.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, result: users });
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to get users, try again later" });
  }
};

export const createUser = async (req, res) => {
  try {
    const { user } = req.body;

    if (typeof user !== "object") {
      res.status(400).json({
        success: false,
        msg: `You need to provide a 'user' object. Received: ${JSON.stringify(
          user
        )}`,
      });

      return;
    }

    const errorList = validateUser(user);

    if (errorList.length > 0) {
      res
        .status(400)
        .json({ success: false, msg: validationErrorMessage(errorList) });
    } else {
      const newUser = await User.create(user);

      res.status(201).json({ success: true, user: newUser });
    }
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to create user, try again later" });
  }
};

export const register = async (req, res) => {
  const saltHash = genPassword(req.body.password);

  const salt = saltHash.salt;
  const hash = saltHash.hash;
  const verificationCode = createVerificationCode();

  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    hash: hash,
    salt: salt,
    isVerified: false,
    isActive: true,
    verificationCode: verificationCode,
  });

  try {
    const user = await newUser.save();
    sendVerificationMail(user.email, verificationCode);
    const jwtToken = issueJWT(user);
    res.json({
      success: true,
      token: jwtToken,
    });
  } catch (err) {
    res.json({ success: false, msg: err });
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, msg: "could not find user" });
    }

    const isValid = validPassword(req.body.password, user.hash, user.salt);

    if (isValid) {
      const jwtToken = issueJWT(user);

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

export const verifyAccount = () => {
  // TODO it will get code from query params and update the user.isVerified as true
};

export const forgotPassword = () => {
  // TODO it will send email with a link that contains a unique code as a query parameter,
  // TODO this code will also be saved to the db with expiration date.
};

export const updatePassword = () => {
  // TODO it will get code and new password from the body of the request,
  // TODO check the code from db, if it is available and not expired then update the password
};

const createVerificationCode = () => {
  const expiredIn = new Date(Date.now() + 24 * 60 * 60 * 1000); // 1 day
  return {
    code: uuidv4(),
    expiredIn: expiredIn,
  };
};
