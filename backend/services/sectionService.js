const Section = require('../models/sectionModel');
const {
  deleteQuestionWithOptionsAndValidations,
} = require('./questionService');

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

async function deleteSectionWithQuestions(section) {
  for (const question of section.questions) {
    await deleteQuestionWithOptionsAndValidations(question);
  }
  await Section.deleteOne({ _id: section._id });
}

module.exports = {
  deleteSectionWithQuestions,
  handleSectionQuestions,
};
