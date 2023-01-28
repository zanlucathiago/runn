const FormResponse = require('../models/formResponseModel');
const Form = require('../models/formModel');
const QuestionResponse = require('../models/questionResponseModel');

// const getInstance = async (req, res) => {
// const sections = await Section.find({ instance: req.params.id }).populate(
//   'questions'
// );
// res.status(200).json(sections);
// };

// const getInstanceList = async (req, res) => {
// const instances = await Instance.find().populate('sections');
// res.status(200).json(
//   instances.map((instance) => ({
//     _id: instance._id,
//     title: instance.sections[0].title,
//     createdAt: instance.createdAt.toLocaleDateString('pt-BR'),
//     updatedAt: instance.updatedAt.toLocaleDateString('pt-BR'),
//   }))
// );
// };

const createInstance = async (req, res) => {
  const form = await Form.findById(req.params.id)
    .populate({
      path: 'sections',
      populate: {
        path: 'questions',
      },
    })
    .populate({ path: 'formResponses' });
  const formResponse = new FormResponse({ form });
  const questionResponses = form.sections
    .reduce((p, c) => [...p, ...c.questions], [])
    .map((question) => {
      const questionResponse = new QuestionResponse({
        formResponse,
        text: req.body[question._id].text,
      });
      const options = question.options.filter((option) =>
        req.body[question._id].options.includes(option._id)
      );
      questionResponse.options = options;
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
  await form.save();
  res.status(200).json(formResponse._id);
};

// const saveInstance = async (req, res) => {
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
// };

// const deleteInstance = async (req, res) => {};

module.exports = {
  // getInstance,
  // getInstanceList,
  createInstance,
  // saveInstance,
  // deleteInstance,
};
