const { MODELS, QUESTION_TYPE } = require('../constants/contants');
const Form = require('../models/formModel');
const Section = require('../models/sectionModel');
const Question = require('../models/questionModel');
const Option = require('../models/optionModel');
const Validation = require('../models/validationModel');

const getPopulateOptions = () => [
  {
    path: 'questions',
    populate: [
      {
        path: 'options',
      },
      {
        path: 'validations',
      },
    ],
  },
  {
    path: 'form',
    populate: [
      {
        path: 'formResponses',
        populate: [
          {
            path: 'questionResponses',
            populate: [
              {
                path: 'question',
              },
            ],
          },
        ],
      },
    ],
  },
];

const isMatchingQuestionResponse =
  (optionIdString, questionIdString, queryParameters) => (questionResponse) => {
    if (questionResponse.question._id.toString() === questionIdString) {
      return questionResponse.options.some(
        (questionResponseOption) =>
          questionResponseOption._id.toString() === optionIdString
      );
    } else if (questionResponse.question.primaryKey) {
      const entryValue =
        queryParameters[`entry.${questionResponse.question._id}`];
      if (questionResponse.question.options.length) {
        return questionResponse.options.some(
          (questionResponseOption) => questionResponseOption._id === entryValue
        );
      } else {
        return questionResponse.text === entryValue;
      }
    }
    return true;
  };

const isFormResponseMathing =
  (...params) =>
  (formResponse) =>
    formResponse.questionResponses.every(isMatchingQuestionResponse(...params));

const isOptionAvailable =
  (formResponses, questionIdString, queryParameters) => (option) =>
    !formResponses.some(
      isFormResponseMathing(
        option._id.toString(),
        questionIdString,
        queryParameters
      )
    );

const handleQuestionEntry = (answers, queryParameters) => (question) => {
  const questionId = question._id;
  const entryQuestionIdValue = queryParameters[`entry.${questionId}`];
  if (entryQuestionIdValue) {
    answers[questionId] = question.options.length
      ? {
          options: [entryQuestionIdValue],
        }
      : {
          text: entryQuestionIdValue,
        };
  }
};

const handleSectionQuestions =
  (...params) =>
  (section) => {
    section.questions.forEach(handleQuestionEntry(...params));
  };

const getForm = async (req, res) => {
  const modelSections = await Section.find({ form: req.params.id }).populate(
    getPopulateOptions()
  );
  for (const section of modelSections) {
    for (const question of section.questions) {
      for (const validation of question.validations) {
        if (
          validation.expression === 'FORM' &&
          validation.operator === 'NOT_EXISTS'
        ) {
          question.options = question.options.filter(
            isOptionAvailable(
              modelSections[0].form.formResponses,
              question._id.toString(),
              req.query
            )
          );
        }
      }
    }
  }
  const answers = {};
  modelSections.forEach(handleSectionQuestions(answers, req.query));
  res.status(200).json({ answers, sections: modelSections });
};

const formatFormDetails = (form) => ({
  _id: form._id,
  title: form.sections.length && form.sections[0].title,
  createdAt: form.createdAt.toLocaleDateString('pt-BR'),
  updatedAt: form.updatedAt.toLocaleDateString('pt-BR'),
});

const getFormList = async (req, res) => {
  const forms = await Form.find().populate('sections');
  res.status(200).json(forms.map(formatFormDetails));
};

const createForm = async (_req, res) => {
  const form = new Form();
  const section = new Section({
    title: '',
    description: '',
    form,
  });
  const question = new Question({
    description: '',
    model: MODELS.MULTIPLE_CHOICE,
    other: false,
    primaryKey: false,
    title: '',
    type: QUESTION_TYPE.QUESTION,
    section,
  });
  const option = new Option({
    text: 'Opção 1',
    question,
  });
  question.options = [option];
  section.questions = [question];
  form.sections = [section];
  await form.save();
  await section.save();
  await question.save();
  await option.save();
  res.status(200).json(form._id);
};

const createOptionFromText = (questionModel) => (option) =>
  new Option({ text: option.text, question: questionModel });

const createValidationFromExpression = (questionModel) => (validation) =>
  new Validation({
    expression: validation.expression,
    operator: validation.operator,
    question: questionModel,
  });

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

const createSectionModelFromData = (form) => (section) => {
  const sectionModel = new Section({
    title: section.title,
    description: section.description,
    form,
  });
  const questions = section.questions.map(
    createQuestionModelFromData(sectionModel)
  );
  sectionModel.questions = questions;
  return sectionModel;
};

const saveForm = async (req, res) => {
  const form = await Form.findById(req.params.id).populate({
    path: 'sections',
    populate: {
      path: 'questions',
    },
  });
  for (const section of form.sections) {
    for (const question of section.questions) {
      for (const option of question.options) {
        await Option.deleteOne({ _id: option._id });
      }
      for (const validation of question.validations) {
        await Validation.deleteOne({ _id: validation._id });
      }
      await Question.deleteOne({ _id: question._id });
    }
    await Section.deleteOne({ _id: section._id });
  }
  const sections = req.body.map(createSectionModelFromData(form));
  form.sections = sections;
  for (const section of sections) {
    for (const question of section.questions) {
      for (const option of question.options) {
        await option.save();
      }
      for (const validation of question.validations) {
        await validation.save();
      }
      await question.save();
    }
    await section.save();
  }
  await form.save();
  res.status(200).json(form._id);
};

const deleteForm = async (req, res) => {};

module.exports = {
  getForm,
  getFormList,
  createForm,
  saveForm,
  deleteForm,
};
