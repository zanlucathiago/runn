const Validation = require('../models/validationModel');

const createValidationFromExpression = (questionModel) => (validation) =>
  new Validation({
    expression: validation.expression,
    operator: validation.operator,
    question: questionModel,
  });

module.exports = {
  createValidationFromExpression,
};
