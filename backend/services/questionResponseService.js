const isMatchingQuestionResponse =
  (optionIdString, questionIdString, queryParameters) => (questionResponse) => {
    if (questionResponse.question._id.toString() === questionIdString) {
      return questionResponse.options.some(
        (questionResponseOption) =>
          questionResponseOption._id.toString() === optionIdString
      );
    } else if (questionResponse.question.primaryKey) {
      const entryValue =
        queryParameters[`entry.${questionResponse.question._id}`];
      if (questionResponse.question.options.length) {
        return questionResponse.options.some(
          (questionResponseOption) => questionResponseOption._id === entryValue
        );
      } else {
        return questionResponse.text === entryValue;
      }
    }
    return true;
  };

module.exports = {
  isMatchingQuestionResponse,
};
