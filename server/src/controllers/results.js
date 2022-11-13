import Event from "../models/Event.js";
import Response from "../models/Response.js";
import {
  getGuestsInformation,
  numberOfNotAttending,
  numberOfAttending,
  getAllTotalAnswers,
  countPercentage,
  getAllTotalAnswersPercnetages,
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
      const guestsInformation = getGuestsInformation(answers);
      const allTotalAnswers = getAllTotalAnswers(answers, keys);
      const allTotalAnswersPercentage = getAllTotalAnswersPercnetages(
        answers,
        keys
      );
      res.status(200).json({
        totalResponse,
        attending,
        attendenigPercnetage,
        notAttending,
        notAttendingPercentage,
        guestsInformation,
        allTotalAnswers,
        allTotalAnswersPercentage,
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
