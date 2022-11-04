import { v4 as uuidv4 } from "uuid";
import User, {
  validateRegisterUser,
  validateLoginUser,
} from "../models/User.js";
import { logError } from "../util/logging.js";
import validationErrorMessage from "../util/validationErrorMessage.js";
import { hashPassword, validatePassword, signJWT } from "../security/auth.js";
import { sendVerificationMail } from "../services/mailService.js";

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
  const verificationCode = createVerificationCode();

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
    sendVerificationMail(user.email, verificationCode);
    const jwtToken = signJWT(user);
    res.json({
      success: true,
      token: jwtToken,
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
