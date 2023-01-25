// const { MODELS, QUESTION_TYPE } = require('../constants/contants');
// const Instance = require('../models/instanceModel');
// const Section = require('../models/sectionModel');
// const Question = require('../models/questionModel');

const getInstance = async (req, res) => {
  // const sections = await Section.find({ instance: req.params.id }).populate(
  //   'questions'
  // );
  // res.status(200).json(sections);
};

const getInstanceList = async (req, res) => {
  // const instances = await Instance.find().populate('sections');
  // res.status(200).json(
  //   instances.map((instance) => ({
  //     _id: instance._id,
  //     title: instance.sections[0].title,
  //     createdAt: instance.createdAt.toLocaleDateString('pt-BR'),
  //     updatedAt: instance.updatedAt.toLocaleDateString('pt-BR'),
  //   }))
  // );
};

const createInstance = async (_req, res) => {
  // const instance = new Instance({ user: 'Thiago' });
  // const section = new Section({
  //   title: '',
  //   description: '',
  //   instance,
  // });
  // const question = new Question({
  //   description: '',
  //   model: MODELS.MULTIPLE_CHOICE,
  //   title: '',
  //   type: QUESTION_TYPE.QUESTION,
  //   section,
  // });
  // section.questions = [question];
  // instance.sections = [section];
  // await instance.save();
  // await section.save();
  // await question.save();
  // res.status(200).json(instance._id);
};

const saveInstance = async (req, res) => {
  // const instance = await Instance.findById(req.params.id).populate('sections');
  // for (const section of instance.sections) {
  //   for (const question of section.questions) {
  //     await Question.deleteOne({ _id: question._id });
  //   }
  //   await Section.deleteOne({ _id: section._id });
  // }
  // const sections = req.body.map((section) => {
  //   const sectionModel = new Section({
  //     title: section.title,
  //     description: section.description,
  //     instance,
  //   });
  //   const questions = section.questions.map(
  //     (question) =>
  //       new Question({
  //         description: question.description,
  //         model: question.model,
  //         title: question.title,
  //         type: question.type,
  //         section: sectionModel,
  //       })
  //   );
  //   sectionModel.questions = questions;
  //   return {
  //     section: sectionModel,
  //     questions,
  //   };
  // });
  // instance.sections = sections.map(({ section }) => section);
  // await instance.save();
  // for (const data of sections) {
  //   await data.section.save();
  //   for (const question of data.questions) {
  //     await question.save();
  //   }
  // }
  // res.status(200).json(instance._id);
};

const deleteInstance = async (req, res) => {};

module.exports = {
  getInstance,
  getInstanceList,
  createInstance,
  saveInstance,
  deleteInstance,
};
