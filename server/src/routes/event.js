import express from "express";
import passport from "passport";
import { createEvent, getEvents } from "../controllers/event.js";

const eventRouter = express.Router();

eventRouter.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  createEvent
);

eventRouter.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  getEvents
);

export default eventRouter;
