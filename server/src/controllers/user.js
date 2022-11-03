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
  // TODO make it unique
  const verificationCode = "uniqueVerificationCode";

  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    hash: hash,
    salt: salt,
    isVerified: false,
    isActive: true,
    lastLoginDate: new Date().now(),
  });

  try {
    const user = await newUser.save();
    sendVerificationMail(verificationCode);
    res.json({ success: true, user: user });

    // .then((user) => {
    // });
  } catch (err) {
    res.json({ success: false, msg: err });
  }
};

export const login = async (req, res, next) => {
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .json({ success: false, msg: "could not find user" });
      }

      // Function defined at bottom of app.js
      const isValid = validPassword(req.body.password, user.hash, user.salt);

      if (isValid) {
        const tokenObject = issueJWT(user);

        res.status(200).json({
          success: true,
          token: tokenObject.token,
          expiresIn: tokenObject.expires,
        });
      } else {
        res
          .status(401)
          .json({ success: false, msg: "you entered the wrong password" });
      }
    })
    .catch((err) => {
      next(err);
    });
};
