import Response from "../models/Response.js";

export const postResponse = async (req, res) => {
  const newResponse = new Response({
    eventId: req.body.eventId,
    guestName: req.body.guestName,
    guestEmail: req.body.guestEmail,
    responses: req.body.responses,
  });
  try {
    const response = await newResponse.save();
    res.status(200).json({
      message: "Success! Thanks you for answering this invitation  ",
      response,
    });
  } catch (err) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};
