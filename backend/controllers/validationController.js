const Question = require('../models/questionModel');
const { isDuplicateFormNotExists } = require('../services/formService');
const { isOptionAvailable } = require('../services/optionService');

function getDaysInMonth(customDate = new Date().toISOString().slice(0, 10)) {
  const [year, month] = customDate.split('-').map(Number);

  const firstDay = new Date(year, month - 1, 1);
  const lastDay = new Date(year, month, 0);

  const daysInMonth = [];
  const currentDate = new Date(firstDay); // Start from the first day of the month

  while (currentDate <= lastDay) {
    const formattedDate = currentDate.toISOString().slice(0, 10);
    daysInMonth.push(formattedDate);

    // Move to the next day
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return daysInMonth;
}

function getDayAsString(dateString) {
  const [, , day] = dateString.split('-');
  return day;
}

const getDateList = async (req, res) => {
  const question = await Question.findById(req.params.id).populate([{
    path: 'validations',
  }, {
    path: 'section',
    populate: {
      path: 'form',
      populate: [{
        path: 'sections',
        populate: {
          path: 'questions',
          populate: {
            path: 'options',
          },
        },
      }, {
        path: 'formResponses',
        populate: {
          path: 'questionResponses',
          populate: [{ path: 'question' }, { path: 'options' }],
        },
      }],
    },
  }]);

  const response = {};

  for (const validation of question.validations) {
    if (
      isDuplicateFormNotExists(validation)
    ) {
      getDaysInMonth(req.query.date).forEach((option) => {
        if (!response[getDayAsString(option)]
        && !isOptionAvailable(
          question.section.form.formResponses,
          question._id.toString(),
          req.query,
        )({ _id: option })
        ) {
          response[getDayAsString(option)] = true;
        }
      });
    } else if (
      validation.expression === 'AVAILABLE_OPTIONS'
      && validation.operator === 'EXISTS'
    ) {
      getDaysInMonth(req.query.date).forEach((option) => {
        if (!response[getDayAsString(option)]) {
          if (!question.section.form.sections.every((section) => section.questions.every((validationQuestion) => {
            if (validationQuestion._id.toString() !== question._id.toString() && validationQuestion.primaryKey) {
              return validationQuestion.options.some(
                isOptionAvailable(
                  question.section.form.formResponses,
                  validationQuestion._id.toString(),
                  {
                    [`entry.${question._id}`]: option,
                  },
                ),
              );
            }
            return true;
          }))) {
            response[getDayAsString(option)] = true;
          }
        }
      });
    }
  }

  res.status(200).json(response);
};

module.exports = {
  getDateList,
};
