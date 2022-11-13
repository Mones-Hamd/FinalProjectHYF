import express from "express";
import passport from "passport";
import { createEvent, getEvents } from "../controllers/event.js";
import { getEventResults } from "../controllers/results.js";

const eventRouter = express.Router();

eventRouter.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  createEvent
);

eventRouter.get(
  "/:userId",
  passport.authenticate("jwt", { session: false }),
  getEvents
);
eventRouter.get("/results/:eventId", getEventResults);

export default eventRouter;
