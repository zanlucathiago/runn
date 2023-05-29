const Section = require('../models/sectionModel');
const Question = require('../models/questionModel');
const Validation = require('../models/validationModel');
const Option = require('../models/optionModel');
const { isFormResponseMathing } = require('./formResponseService');

const createOptionFromText = (questionModel) => (option) =>
  new Option({ text: option.text, question: questionModel });

async function deleteOptionsValidationsQuestions(sections) {
  for (const section of sections) {
    for (const question of section.questions) {
      await Promise.all([
        Option.deleteMany({ _id: { $in: question.options } }),
        Validation.deleteMany({ _id: { $in: question.validations } }),
        Question.deleteOne({ _id: question._id }),
      ]);
    }
    await Section.deleteOne({ _id: section._id });
  }
}

async function saveOptionsValidationsQuestions(sections) {
  for (const section of sections) {
    for (const question of section.questions) {
      await Promise.all([
        Promise.all(question.options.map((option) => option.save())),
        Promise.all(
          question.validations.map((validation) => validation.save())
        ),
      ]);
      await question.save();
    }
    await section.save();
  }
}

const isOptionAvailable =
  (formResponses, questionIdString, queryParameters) => (option) =>
    !formResponses.some(
      isFormResponseMathing(
        option._id.toString(),
        questionIdString,
        queryParameters
      )
    );

module.exports = {
  createOptionFromText,
  deleteOptionsValidationsQuestions,
  isOptionAvailable,
  saveOptionsValidationsQuestions,
};
