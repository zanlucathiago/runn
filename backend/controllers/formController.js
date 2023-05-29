const { MODELS, QUESTION_TYPE } = require('../constants/contants');
const Form = require('../models/formModel');
const Section = require('../models/sectionModel');
const Question = require('../models/questionModel');
const Option = require('../models/optionModel');
const { getPopulateOptions } = require('../services/populateService');
const {
  createQuestionModelFromData,
  filterQuestionOptions,
} = require('../services/questionService');
const {
  deleteOptionsValidationsQuestions,
  saveOptionsValidationsQuestions,
} = require('../services/optionService');
const { handleSectionQuestions } = require('../services/sectionService');

async function processForm(req, res) {
  const modelSections = await Section.find({ form: req.params.id }).populate(
    getPopulateOptions()
  );

  filterQuestionOptions(modelSections, req.query);

  const answers = {};
  modelSections.forEach((section) =>
    handleSectionQuestions(section, answers, req.query)
  );

  res.status(200).json({ answers, sections: modelSections });
}

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
  await Promise.all([
    form.save(),
    section.save(),
    question.save(),
    option.save(),
  ]);
  res.status(200).json(form._id);
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

async function updateForm(req, res) {
  const form = await Form.findById(req.params.id).populate({
    path: 'sections',
    populate: {
      path: 'questions',
    },
  });

  await deleteOptionsValidationsQuestions(form.sections);

  const sections = req.body.map(createSectionModelFromData(form));
  form.sections = sections;
  await saveOptionsValidationsQuestions(sections);

  await form.save();
  res.status(200).json(form._id);
}

const deleteForm = async (req, res) => {};

module.exports = {
  processForm,
  getFormList,
  createForm,
  updateForm,
  deleteForm,
};
