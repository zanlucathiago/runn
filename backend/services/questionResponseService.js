const isMatchingQuestionResponse = (
  optionIdString,
  questionIdString,
  queryParameters,
) => (questionResponse) => {
  if (questionResponse.question._id.toString() === questionIdString) {
    if (questionResponse.question.options.length) {
      return questionResponse.options.some(
        (questionResponseOption) => questionResponseOption._id.toString() === optionIdString,
      );
    }
    if (questionResponse.text === optionIdString) {
      return true;
    }
    return false;
  } if (questionResponse.question.primaryKey) {
    const entryValue = queryParameters[`entry.${questionResponse.question._id}`];
    if (questionResponse.question.options.length) {
      return questionResponse.options.some(
        (questionResponseOption) => questionResponseOption._id.toString() === entryValue,
      );
    }
    return questionResponse.text === entryValue;
  }
  return true;
};

module.exports = {
  isMatchingQuestionResponse,
};
