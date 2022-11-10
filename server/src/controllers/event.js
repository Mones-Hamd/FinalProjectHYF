import Event from "../models/Event.js";
import { nanoid } from "nanoid";

export const createEvent = async (req, res) => {
  const newEvent = new Event({
    creatorId: req.user._id,
    creatorName: req.user.username,
    creatorEmail: req.user.email,
    isPrivate: req.body.isPrivate || false,
    type: req.body.type || "WEDDING",
    template: req.body.template || "DEFAULT",
    templateDetails: req.body.templateDetails,
    form: req.body.form,
    url: generateShortLink(),
  });

  const event = await newEvent.save();

  res.status(200).json({
    success: true,
    event: event,
    msg: "You are successfully authenticated to this route!",
  });
};

export const getEvent = async (/* req, res, next */) => {};

export const getEvents = async (/* req, res, next */) => {};

const generateShortLink = () => {
  const id = nanoid(process.env.SHORT_LINK_LENGTH || 7);
  return `${process.env.CLIENT_HOST}:${process.env.CLIENT_PORT}/to/${id}`;
};
