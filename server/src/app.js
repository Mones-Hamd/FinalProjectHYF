import express from "express";
import cors from "cors";
import passport from "passport";

import { config } from "./config/pasport.js";
import userRouter from "./routes/user.js";

// Create an express server
const app = express();

config(passport);
app.use(passport.initialize());
// Tell express to use the json middleware
app.use(express.json());
// Allow everyone to access our API. In a real application, we would need to restrict this!
app.use(cors());

/****** Attach routes ******/
/**
 * We use /api/ at the start of every route!
 * As we also host our client code on heroku we want to separate the API endpoints.
 */
app.use("/api/user", userRouter);

export default app;
