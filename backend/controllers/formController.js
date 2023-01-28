const { MODELS, QUESTION_TYPE } = require('../constants/contants');
const Form = require('../models/formModel');
const Section = require('../models/sectionModel');
const Question = require('../models/questionModel');
const Option = require('../models/optionModel');

const getForm = async (req, res) => {
  const sections = await Section.find({ form: req.params.id }).populate({
    path: 'questions',
    populate: {
      path: 'options',
    },
  });
  res.status(200).json(sections);
};

const getFormList = async (req, res) => {
  const forms = await Form.find().populate('sections');
  res.status(200).json(
    forms.map((form) => ({
      _id: form._id,
      title: form.sections[0].title,
      createdAt: form.createdAt.toLocaleDateString('pt-BR'),
      updatedAt: form.updatedAt.toLocaleDateString('pt-BR'),
    }))
  );
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
      await Question.deleteOne({ _id: question._id });
    }
    await Section.deleteOne({ _id: section._id });
  }

  const sections = req.body.map((section) => {
    const sectionModel = new Section({
      title: section.title,
      description: section.description,
      form,
    });
    const questions = section.questions.map((question) => {
      const questionModel = new Question({
        description: question.description,
        model: question.model,
        other: question.other,
        title: question.title,
        type: question.type,
        section: sectionModel,
      });
      const options = question.options.map(
        (option) => new Option({ text: option.text, question: questionModel })
      );
      questionModel.options = options;
      return questionModel;
    });
    sectionModel.questions = questions;
    return sectionModel;
  });
  form.sections = sections;
  for (const section of sections) {
    for (const question of section.questions) {
      for (const option of question.options) {
        await option.save();
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
