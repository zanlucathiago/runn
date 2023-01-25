const { MODELS, QUESTION_TYPE } = require('../constants/contants');
const Form = require('../models/formModel');
const Section = require('../models/sectionModel');
const Question = require('../models/questionModel');

const getForm = async (req, res) => {
  const sections = await Section.find({ form: req.params.id }).populate(
    'questions'
  );
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
  const form = new Form({ user: 'Thiago' });
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
  section.questions = [question];
  form.sections = [section];
  await form.save();
  await section.save();
  await question.save();
  res.status(200).json(form._id);
};

const saveForm = async (req, res) => {
  const form = await Form.findById(req.params.id).populate('sections');
  for (const section of form.sections) {
    for (const question of section.questions) {
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
    const questions = section.questions.map(
      (question) =>
        new Question({
          description: question.description,
          model: question.model,
          title: question.title,
          type: question.type,
          section: sectionModel,
        })
    );
    sectionModel.questions = questions;
    return {
      section: sectionModel,
      questions,
    };
  });
  form.sections = sections.map(({ section }) => section);
  await form.save();
  for (const data of sections) {
    await data.section.save();
    for (const question of data.questions) {
      await question.save();
    }
  }
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
