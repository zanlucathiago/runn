// const asyncHandler = require('express-async-handler')

const Form = require('../models/formModel');
const Section = require('../models/sectionModel');
const Question = require('../models/questionModel');
// const User = require('../models/userModel')

// @desc    Get forms
// @route   GET /api/forms
// @access  Private
const getForms = async (req, res) => {
  // const forms = await Form.find({ user: req.user.id })
  // res.status(200).json(forms)
};

// @desc    Set form
// @route   POST /api/forms
// @access  Private
const setForm = async (req, res) => {
  const form = new Form({ user: 'Thiago' });
  await form.save();
  for (const section of req.body) {
    const sectionModel = new Section({
      title: section.title,
      description: section.description,
      form,
    });
    await sectionModel.save();
    for (const question of section.questions) {
      const questionModel = new Question({
        ...question,
        section: sectionModel,
      });
      await questionModel.save();
    }
  }
  res.status(200).json(form);
};

// @desc    Update form
// @route   PUT /api/forms/:id
// @access  Private
const updateForm = async (req, res) => {
  // const form = await Form.findById(req.params.id)
  // if (!form) {
  //   res.status(400)
  //   throw new Error('Form not found')
  // }
  // // Check for user
  // if (!req.user) {
  //   res.status(401)
  //   throw new Error('User not found')
  // }
  // // Make sure the logged in user matches the form user
  // if (form.user.toString() !== req.user.id) {
  //   res.status(401)
  //   throw new Error('User not authorized')
  // }
  // const updatedForm = await Form.findByIdAndUpdate(req.params.id, req.body, {
  //   new: true,
  // })
  // res.status(200).json(updatedForm)
};

// @desc    Delete form
// @route   DELETE /api/forms/:id
// @access  Private
const deleteForm = async (req, res) => {
  // const form = await Form.findById(req.params.id)
  // if (!form) {
  //   res.status(400)
  //   throw new Error('Form not found')
  // }
  // // Check for user
  // if (!req.user) {
  //   res.status(401)
  //   throw new Error('User not found')
  // }
  // // Make sure the logged in user matches the form user
  // if (form.user.toString() !== req.user.id) {
  //   res.status(401)
  //   throw new Error('User not authorized')
  // }
  // await form.remove()
  // res.status(200).json({ id: req.params.id })
};

module.exports = {
  getForms,
  setForm,
  updateForm,
  deleteForm,
};
