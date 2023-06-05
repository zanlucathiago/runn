function handleSectionQuestions(section, answers, queryParams) {
  section.questions.forEach((question) => {
    const questionId = question._id;
    const questionAnswer = queryParams[`entry.${questionId}`];
    if (questionAnswer) {
      answers[questionId] = question.options.length ? {
        options: [questionAnswer],
        text: null,
      } : {
        options: [],
        text: questionAnswer,
      };
    }
  });
}

module.exports = {
  handleSectionQuestions,
};
