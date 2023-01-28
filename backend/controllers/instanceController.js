const FormResponse = require('../models/formResponseModel');
const Form = require('../models/formModel');
const QuestionResponse = require('../models/questionResponseModel');

const getInstanceList = async (req, res) => {
  const form = await Form.findById(req.params.id)
    .populate({
      path: 'sections',
      populate: { path: 'questions' },
    })
    .populate({
      path: 'formResponses',
      populate: {
        path: 'questionResponses',
        populate: { path: 'question', path: 'options' },
      },
    });
  const columns = form.sections
    .reduce((p, c) => [...p, ...c.questions], [])
    .map((question) => ({
      field: question._id,
      headerName: question.title,
      sortable: false,
    }));
  res.status(200).json({
    columns,
    rows: form.formResponses.map((formResponse) =>
      formResponse.questionResponses.reduce(
        (p, c) => ({
          ...p,
          [c.question._id]: [
            ...c.options.map((option) => option.text),
            ...(c.text ? [c.text] : []),
          ].join(', '),
        }),
        {
          id: formResponse._id,
        }
      )
    ),
  });
};

const createInstance = async (req, res) => {
  const form = await Form.findById(req.params.id)
    .populate({
      path: 'sections',
      populate: {
        path: 'questions',
        populate: {
          path: 'options',
        },
      },
    })
    .populate({ path: 'formResponses' });
  const formResponse = new FormResponse({ form });
  const questionResponses = form.sections
    .reduce((p, c) => [...p, ...c.questions], [])
    .map((question) => {
      const questionResponse = new QuestionResponse({
        formResponse,
        question,
        text: req.body[question._id].text,
      });
      const options = question.options.filter((option) => {
        const isSelected = req.body[question._id].options.includes(
          option._id.toString()
        );
        if (isSelected) {
          option.questionResponses = [
            ...option.questionResponses,
            questionResponse,
          ];
          return true;
        }
        return false;
      });
      question.questionResponses = [
        ...question.questionResponses,
        questionResponse,
      ];
      questionResponse.options = options;
      return questionResponse;
    });
  formResponse.questionResponses = questionResponses;
  form.formResponses = [...form.formResponses, formResponse];
  for (const questionResponse of questionResponses) {
    for (const option of questionResponse.options) {
      console.log(
        '🚀 ~ file: instanceController.js:108 ~ createInstance ~ option',
        option
      );
      await option.save();
    }
    await questionResponse.save();
  }
  await formResponse.save();
  for (const section of form.sections) {
    for (const question of section.questions) {
      await question.save();
    }
  }
  await form.save();
  res.status(200).json(formResponse._id);
};

module.exports = {
  getInstanceList,
  createInstance,
};
