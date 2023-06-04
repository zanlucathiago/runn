const FormResponse = require('../models/formResponseModel');
const Form = require('../models/formModel');
const QuestionResponse = require('../models/questionResponseModel');
const { filterQuestionOptions } = require('../services/questionService');
const { getPopulateOptions } = require('../services/populateService');
const Section = require('../models/sectionModel');
const { handleSectionQuestions } = require('../services/sectionService');

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
        populate: [{ path: 'question' }, { path: 'options' }],
      },
    });
  const questions = form.sections.reduce(combineQuestions, []);
  res.status(200).json({
    questions,
    responses: form.formResponses.map(generateFormResponseOptions),
  });
};

const getInstance = async (req, res) => {
  const modelSections = await Section.find({ form: req.params.id }).populate(
    getPopulateOptions(),
  );

  await filterQuestionOptions(modelSections, req.query);

  const answers = {};
  modelSections.forEach((section) => handleSectionQuestions(section, answers, req.query));

  res.status(200).json({ answers, sections: modelSections });
};

const combineQuestions = (p, c) => [...p, ...c.questions];

const generateFormResponseOptions = (formResponse) => formResponse.questionResponses.reduce(generateQuestionOptions, {
  _id: formResponse._id,
});

const generateQuestionOptions = (p, c) => ({
  ...p,
  [c.question._id]: [
    ...c.options.map(extractOptionText),
    ...(c.text ? [c.text] : []),
  ].join(', '),
});

const extractOptionText = (option) => option.text;

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
    .reduce(combineQuestions, [])
    .map((question) => {
      const { options = [], text } = req.body[question._id] || {};
      const questionResponse = new QuestionResponse({
        formResponse,
        question,
        text,
      });
      const optionsModels = question.options.filter(
        updateSelectedOptionWithResponse(options, questionResponse),
      );
      question.questionResponses = [
        ...question.questionResponses,
        questionResponse,
      ];
      questionResponse.options = optionsModels;
      return questionResponse;
    });
  formResponse.questionResponses = questionResponses;
  form.formResponses = [...form.formResponses, formResponse];
  for (const questionResponse of questionResponses) {
    for (const option of questionResponse.options) {
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

const updateSelectedOptionWithResponse = (options, questionResponse) => (option) => {
  const isSelected = options.includes(option._id.toString());
  if (isSelected) {
    option.questionResponses = [
      ...option.questionResponses,
      questionResponse,
    ];
    return true;
  }
  return false;
};

module.exports = {
  getInstance,
  getInstanceList,
  createInstance,
};
