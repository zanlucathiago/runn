const { isMatchingQuestionResponse } = require('./questionResponseService');

const isFormResponseMathing = (...params) => (formResponse) => formResponse
  .questionResponses.every(isMatchingQuestionResponse(...params));

module.exports = {
  isFormResponseMathing,
};
