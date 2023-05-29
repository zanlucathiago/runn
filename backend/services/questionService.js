const Validation = require('../models/validationModel');
const Option = require('../models/optionModel');
const Question = require('../models/questionModel');
const { createOptionFromText, isOptionAvailable } = require('./optionService');
const { createValidationFromExpression } = require('./validationService');

const createQuestionModelFromData = (sectionModel) => (question) => {
  const questionModel = new Question({
    description: question.description,
    model: question.model,
    other: question.other,
    primaryKey: question.primaryKey,
    title: question.title,
    type: question.type,
    section: sectionModel,
  });
  const options = question.options.map(createOptionFromText(questionModel));
  questionModel.options = options;
  const validations = question.validations.map(
    createValidationFromExpression(questionModel)
  );
  questionModel.validations = validations;
  return questionModel;
};

function filterQuestionOptions(sections, queryParams) {
  for (const section of sections) {
    for (const question of section.questions) {
      for (const validation of question.validations) {
        if (
          validation.expression === 'DUPLICATE_FORM' &&
          validation.operator === 'NOT_EXISTS'
        ) {
          question.options = question.options.filter(
            isOptionAvailable(
              section.form.formResponses,
              question._id.toString(),
              queryParams
            )
          );
        }
      }
    }
  }
}

const deleteQuestionWithOptionsAndValidations = (question) => {
  return Promise.all([
    Option.deleteMany({ _id: { $in: question.options } }),
    Validation.deleteMany({ _id: { $in: question.validations } }),
    Question.deleteOne({ _id: question._id }),
  ]);
};

module.exports = {
  createQuestionModelFromData,
  deleteQuestionWithOptionsAndValidations,
  filterQuestionOptions,
};
