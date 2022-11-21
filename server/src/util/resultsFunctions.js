export const numberOfResponses = (answers) => {
  return answers.length;
};
const getTargetResponses = (answers) => {
  const targetResponses = [];
  answers.forEach((answer) => {
    answer.responses.forEach((response) => {
      if (response.question === "response" && response.answer === "yes") {
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
  const notAttending =
    numberOfResponses(answers) - getTargetResponses(answers).length;
  return notAttending;
};
export const getGuestsInformation = (answers) => {
  const guestsInformation = [];
  const targetResponses = getTargetResponses(answers);
  targetResponses.forEach((response) => {
    const obj = {};
    obj["guestName"] = response.guestName;
    obj["guestEmail"] = response.guestEmail;
    guestsInformation.push(obj);
  });
  return guestsInformation;
};
const getTotalAnswersByKey = (answers, key) => {
  const obj = {};
  getTargetResponses(answers).forEach((answer) => {
    answer.responses.forEach((response) => {
      if (response.question === key) {
        const amount = (obj[response.answer] || 0) + 1;
        obj[response.answer] = amount;
      }
    });
  });
  return obj;
};
export const getAllTotalAnswers = (answers, keys) => {
  const allTotalAnswers = {};
  keys.forEach((key) => {
    if (
      key === "fullName" ||
      key === "email" ||
      key === "response" ||
      key === "numberOfPeople"
    )
      return;
    const total = getTotalAnswersByKey(answers, key);
    allTotalAnswers[key] = total;
  });
  return allTotalAnswers;
};
export const countPercentage = (total, amount) => {
  const percentage = (amount / total) * 100;
  return percentage.toFixed(2);
};
export const getAllTotalAnswersPercentages = (answers, keys) => {
  const allTotalAnswersPercentage = {};
  const total = numberOfAttending(answers);
  keys.forEach((key) => {
    const obj = getTotalAnswersByKey(answers, key);
    Object.entries(obj).forEach((entry) => {
      obj[entry[0]] = countPercentage(total, entry[1]);
      allTotalAnswersPercentage[key] = obj;
    });
  });
  return allTotalAnswersPercentage;
};
export const getChartsArrays = (answers, keys) => {
  const allChartArray = [];
  const allTotalAnswers = getAllTotalAnswers(answers, keys);
  const allTotalAnswersArray = Object.values(allTotalAnswers);
  allTotalAnswersArray.forEach((answer) => {
    const obj = {};
    obj["labels"] = Object.keys(answer);
    obj["data"] = Object.values(answer);
    allChartArray.push(obj);
  });
  return allChartArray;
};
export const getSubject = (answers, keys) => {
  const allTotalAnswers = getAllTotalAnswers(answers, keys);

  return Object.keys(allTotalAnswers);
};
