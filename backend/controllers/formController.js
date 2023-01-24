// const asyncHandler = require('express-async-handler')

const { MODELS, QUESTION_TYPE } = require('../constants/contants');
const Form = require('../models/formModel');
const Section = require('../models/sectionModel');
const Question = require('../models/questionModel');
// const User = require('../models/userModel')

// @desc    Get forms
// @route   GET /api/forms
// @access  Private
const getForm = async (req, res) => {
  const sections = await Section.find({ form: req.params.id }).populate(
    'questions'
  );
  res.status(200).json(sections);
};

// @desc    Set form
// @route   POST /api/forms
// @access  Private
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

// @desc    Update form
// @route   PUT /api/forms/:id
// @access  Private
const saveForm = async (req, res) => {
  // const form = new Form({ user: 'Thiago' });
  // await form.save();
  // for (const section of req.body) {
  //   const sectionModel = new Section({
  //     title: section.title,
  //     description: section.description,
  //     form,
  //   });
  //   await sectionModel.save();
  //   for (const question of section.questions) {
  //     const questionModel = new Question({
  //       ...question,
  //       section: sectionModel,
  //     });
  //     await questionModel.save();
  //   }
  // }
  // res.status(200).json(form);
};

// @desc    Delete form
// @route   DELETE /api/forms/:id
// @access  Private
const deleteForm = async (req, res) => {};

module.exports = {
  getForm,
  createForm,
  saveForm,
  deleteForm,
};
