function handleSectionQuestions(section, answers, queryParams) {
  section.questions.forEach((question) => {
    const questionId = question._id;
    const questionAnswer = queryParams[`entry.${questionId}`];
    if (questionAnswer) {
      answers[questionId] = {
        text: questionAnswer,
      };
    }
  });
}

module.exports = {
  handleSectionQuestions,
};
