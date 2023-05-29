function handleSectionQuestions(section, answers, queryParams) {
  return (question) => {
    const questionId = question._id;
    const questionAnswer = section.form.formResponses[questionId];
    if (questionAnswer?.text) {
      answers[questionId] = questionAnswer.text;
    }
  };
}

module.exports = {
  handleSectionQuestions,
};
