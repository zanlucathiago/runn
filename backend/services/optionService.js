const Option = require('../models/optionModel');
const { isFormResponseMathing } = require('./formResponseService');

const createOptionFromText = (questionModel) => (option) =>
  new Option({ text: option.text, question: questionModel });

async function saveOptionsValidationsQuestions(sections) {
  for (const section of sections) {
    for (const question of section.questions) {
      await Promise.all([
        Promise.all(
          question.validations.map((validation) => {
            return validation.save();
          })
        ),
      ]);
      await question.save();
    }
    await section.save();
  }
}

const isOptionAvailable =
  (formResponses, ...params) =>
  (option) =>
    !formResponses.some(
      isFormResponseMathing(option._id.toString(), ...params)
    );

module.exports = {
  createOptionFromText,
  isOptionAvailable,
  saveOptionsValidationsQuestions,
};
