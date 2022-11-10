import Event from "../models/Event.js";

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
