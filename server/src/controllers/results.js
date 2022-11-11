import Event from "../models/Event.js";
import {
  getGuestsInformations,
  numberOfNotAttending,
  numberOfAttending,
  getAllTotalPrevelage,
  countPercentage,
} from "../util/resultsFunctions.js";

export const getEventResults = async (req, res) => {
  const { id } = req.params.eventId;

  try {
    const targetEvent = await new Event.findOne({ _id: id });
    const keys = targetEvent.form.map((question) => question.key);
    const answers = []; //await new Response.find({ eventId: id });
    const totalResponse = answers.length;
    const attending = numberOfAttending(answers);
    const attendenigPercnetage = countPercentage(totalResponse, attending);
    const notAttending = numberOfNotAttending(answers);
    const notAttendingPercentage = 100 - attendenigPercnetage;
    const guestsInformations = getGuestsInformations(answers);
    const allTotalPrevelages = getAllTotalPrevelage(answers, keys);
    const allTotalPrevelagesPercentage = allTotalPrevelages.map(
      ({ key, total }) => ({ [key]: countPercentage(attending, total) })
    );
    res.status(200).json({
      totalResponse,
      attending,
      attendenigPercnetage,
      notAttending,
      notAttendingPercentage,
      guestsInformations,
      allTotalPrevelages,
      allTotalPrevelagesPercentage,
    });
  } catch (err) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};
