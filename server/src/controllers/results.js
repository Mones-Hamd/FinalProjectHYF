import Event from "../models/Event.js";
import Response from "../models/Response.js";
import {
  getGuestsInformations,
  numberOfNotAttending,
  numberOfAttending,
  getAllTotalPrevelage,
  countPercentage,
  getAllTotalPrevelagePercnetages,
} from "../util/resultsFunctions.js";

export const getEventResults = async (req, res) => {
  const eventId = req.params.eventId;
  try {
    const targetEvent = await Event.findById(eventId);
    const keys = targetEvent.form.map((question) => question.key);
    const answers = await Response.find({ eventId });
    if (answers) {
      const totalResponse = answers.length;
      const attending = numberOfAttending(answers);
      const attendenigPercnetage = countPercentage(totalResponse, attending);
      const notAttending = numberOfNotAttending(answers);
      const notAttendingPercentage = 100 - attendenigPercnetage;
      const guestsInformations = getGuestsInformations(answers);
      const allTotalPrevelages = getAllTotalPrevelage(answers, keys);
      const allTotalPrevelagesPercentage = getAllTotalPrevelagePercnetages(
        answers,
        keys
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
    } else {
      res.json({
        message:
          "Sorry! .. It seems that no one has answered your invitation yet ..",
      });
    }
  } catch (err) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};
