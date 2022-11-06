import { Strategy, ExtractJwt } from "passport-jwt";
import { PUB_KEY } from "../security/keys.js";
import User from "../models/User.js";

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ["RS256"],
};

const strategyFunction = (jwt_payload, done) => {
  User.findOne({ _id: jwt_payload.sub }, function (err, user) {
    if (err) {
      return done(err, false);
    }
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  });
};

export const config = (passport) => {
  passport.use(new Strategy(options, strategyFunction));
};
