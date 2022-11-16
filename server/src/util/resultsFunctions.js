export const numberOfResponses = (answers) => {
  return answers.length;
};
const getTargetResponses = (answers) => {
  const targetResponses = [];
  answers.forEach((answer) => {
    answer.responses.forEach((response) => {
      if (
        response.question.questionKey === "response" &&
        response.answer.answerValue === "yes"
      ) {
        targetResponses.push(answer);
      }
    });
  });
  return targetResponses;
};
export const numberOfAttending = (answers) => {
  const attending = getTargetResponses(answers).length;
  return attending;
};
export const numberOfNotAttending = (answers) => {
  const notAttending = numberOfResponses(answers) - numberOfAttending(answers);
  return notAttending;
};
export const getGuestsInformation = (answers) => {
  const guestsInformation = [];
  const obj = {};
  getTargetResponses(answers).forEach((response) => {
    const guestName = response.guestName;
    const guestEmail = response.guestEmail;
    obj["guestName"] = guestName;
    obj["guestEmail"] = guestEmail;
    guestsInformation.push(obj);
  });

  return guestsInformation;
};
const getTotalAnswersByKey = (answers, key) => {
  const allAnswers = [];
  getTargetResponses(answers).forEach((answer) => {
    answer.responses.forEach((response) => {
      if (response.question.questionKey === key) {
        allAnswers.push(answer);
      } else {
        return;
      }
    });
  });
  const total = allAnswers.length;
  return total;
};
export const getAllTotalAnswers = (answers, keys) => {
  const allTotalAnswers = {};

  keys.forEach((key) => {
    const total = getTotalAnswersByKey(answers, key);
    allTotalAnswers[key] = total;
  });

  return allTotalAnswers;
};
export const countPercentage = (total, amount) => {
  const percentage = (amount / total) * 100;
  return percentage;
};
export const getAllTotalAnswersPercentages = (answers, keys) => {
  const allTotalAnswersPercentage = {};
  const total = numberOfAttending(answers);
  keys.forEach((key) => {
    const amount = getTotalAnswersByKey(answers, key);
    const percentage = countPercentage(total, amount);
    allTotalAnswersPercentage[key] = percentage;
  });
  return allTotalAnswersPercentage;
};
