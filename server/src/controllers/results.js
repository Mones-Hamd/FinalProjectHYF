import Event from "../models/Event.js";
import Response from "../models/Response.js";
import {
  getGuestsInformation,
  numberOfNotAttending,
  numberOfAttending,
  getAllTotalAnswers,
  countPercentage,
  getAllTotalAnswersPercentages,
  getSubject,
  getChartsArrays,
} from "../util/resultsFunctions.js";
export const getEventResults = async (req, res) => {
  const eventId = req.params.eventId;
  try {
    const targetEvent = await Event.findById(eventId);
    const keys = targetEvent.form.map((question) => question.key);
    const answers = await Response.find({ eventId });
    if (answers.length > 0) {
      const totalResponse = answers.length;
      const attending = numberOfAttending(answers);
      const notAttending = numberOfNotAttending(answers);
      const attendingPercentage = countPercentage(totalResponse, attending);
      const notAttendingPercentage = 100 - attendingPercentage;
      const guestsInformation = getGuestsInformation(answers);
      const allTotalAnswers = getAllTotalAnswers(answers, keys);
      const allTotalAnswersPercentage = getAllTotalAnswersPercentages(
        answers,
        keys
      );
      const subjectArray = getSubject(answers, keys);
      const chartArray = getChartsArrays(answers, keys);
      res.status(200).json({
        success: true,
        result: {
          totalResponse,
          attending,
          attendingPercentage,
          notAttending,
          notAttendingPercentage,
          guestsInformation,
          allTotalAnswers,
          allTotalAnswersPercentage,
          subjectArray,
          chartArray,
        },
      });
    } else {
      res.json({
        success: true,
        result:
          "Sorry! .... It seems that no one has answered your invitation yet ..",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
