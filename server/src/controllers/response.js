import Response from "../models/Response.js";

export const postResponse = async (req, res) => {
  const responseRequest = {
    eventId: req.body.eventId,
    guestName: req.body.guestName,
    guestEmail: req.body.guestEmail,
    responses: req.body.responses,
  };

  try {
    const isExists = await Response.find({ guestEmail: req.body.guestEmail });
    if (isExists) {
      const response = await Response.findOneAndUpdate(
        {
          guestEmail: req.body.guestEmail,
        },
        responseRequest,
        { new: true }
      );
      res.status(200).json({
        success: true,
        message: "Success! Thanks you for Updating your Answers  ",
        response,
      });
    } else {
      const newResponse = new Response(responseRequest);
      const response = await newResponse.save();

      res.status(200).json({
        success: true,
        message: "Success! Thanks you for answering this invitation  ",
        response,
      });
    }
  } catch (err) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};
