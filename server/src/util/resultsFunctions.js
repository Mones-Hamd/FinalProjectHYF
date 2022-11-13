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
  const attendenig = getTargetResponses(answers).length;
  return attendenig;
};
export const numberOfNotAttending = (answers) => {
  const notAttending = numberOfResponses(answers) - numberOfAttending(answers);
  return notAttending;
};
export const getGuestsInformations = (answers) => {
  const nameOfGuest = getTargetResponses(answers).map(
    (response) => response.guestName
  );
  const emailOfGuests = getTargetResponses(answers).map(
    (response) => response.guestEmail
  );
  return { nameOfGuest, emailOfGuests };
};
const getTotalPrevelageByKey = (answers, key) => {
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
export const getAllTotalPrevelage = (answers, keys) => {
  const allTotalPrevelages = {};

  keys.forEach((key) => {
    const total = getTotalPrevelageByKey(answers, key);
    allTotalPrevelages[key] = total;
  });

  return allTotalPrevelages;
};
export const countPercentage = (total, amount) => {
  const percentage = (amount / total) * 100;
  return percentage;
};
export const getAllTotalPrevelagePercnetages = (answers, keys) => {
  const allTotalPrevelagesPercentage = {};
  const total = numberOfAttending(answers);
  keys.forEach((key) => {
    const amount = getTotalPrevelageByKey(answers, key);
    const percentage = countPercentage(total, amount);
    allTotalPrevelagesPercentage[key] = percentage;
  });
  return allTotalPrevelagesPercentage;
};
