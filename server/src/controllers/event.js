import Event, { validateEvent } from "../models/Event.js";
import validationErrorMessage from "../util/validationErrorMessage.js";
import { nanoid } from "nanoid";

export const createEvent = async (req, res) => {
  const errorList = validateEvent(req.body);

  if (errorList.length > 0) {
    res
      .status(400)
      .json({ success: false, msg: validationErrorMessage(errorList) });
    return;
  }

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

export const getEvents = async (req, res) => {
  const { userId } = req.user._id;

  try {
    const events = await new Event.find({ creatorId: userId });
    if (!events) res.json({ message: "There is no events yet" });
    res.status(200).json(events);
  } catch (err) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const generateShortLink = () => {
  const id = nanoid(process.env.SHORT_LINK_LENGTH || 7);
  return `${process.env.CLIENT_HOST}:${process.env.CLIENT_PORT}/to/${id}`;
};
