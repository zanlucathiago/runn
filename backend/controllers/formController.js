const { MODELS, QUESTION_TYPE } = require('../constants/contants');
const Form = require('../models/formModel');
const Section = require('../models/sectionModel');
const Question = require('../models/questionModel');
const Option = require('../models/optionModel');
const Validation = require('../models/validationModel');
const { getPopulateOptions } = require('../services/populateService');
const { transformData } = require('../services/dataService');

async function processForm(req, res) {
  const modelSections = await Section.find({ form: req.params.id }).populate(
    getPopulateOptions(),
  );

  res.status(200).json({ answers: [], sections: modelSections });
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

const separateUpdateAndCreateItems = (data) => data.reduce(
  ({ toCreate, toUpdate }, c) => (c._id
    ? {
      toCreate,
      toUpdate: [...toUpdate, c],
    }
    : { toUpdate, toCreate: [...toCreate, c] }),
  {
    toUpdate: [],
    toCreate: [],
  },
);

const deleteSectionAndUpdateForm = async (formSectionId, form) => {
  await Section.deleteOne({ _id: formSectionId });
  form.sections = form.sections.filter(
    (section) => section._id.toString() !== formSectionId.toString(),
  );
};

const deleteQuestionAndUpdateSection = async (formQuestionId, section) => {
  await Question.deleteOne({ _id: formQuestionId });
  section.questions = section.questions.filter(
    (question) => question._id.toString() !== formQuestionId.toString(),
  );
};

const deleteOptionAndUpdateQuestion = async (formOptionId, question) => {
  await Option.deleteOne({ _id: formOptionId });
  question.options = question.options.filter(
    (option) => option._id.toString() !== formOptionId.toString(),
  );
};

const deleteValidationAndUpdateQuestion = async (
  formValidationId,
  question,
) => {
  await Validation.deleteOne({ _id: formValidationId });
  question.validations = question.validations.filter(
    (validation) => validation._id.toString() !== formValidationId.toString(),
  );
};

const findUpdatedItem = (items, document) => items.toUpdate.find((item) => item._id === document._id.toString());

async function updateForm(req, res) {
  const form = await Form.findById(req.params.id).populate({
    path: 'sections',
    populate: {
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
  });
  const separatedSections = separateUpdateAndCreateItems(req.body);
  await updateSections(form, separatedSections);
  await createSections(separatedSections, form);
  await form.save();
  res.status(200).json(
    form.sections.map(transformData),
  );
}

const updateSections = async (form, separatedSections) => {
  for (const formSection of form.sections) {
    const foundSection = findUpdatedItem(separatedSections, formSection);
    if (!foundSection) {
      await deleteSectionAndUpdateForm(formSection._id, form);
    } else {
      formSection.title = foundSection.title;
      formSection.description = foundSection.description;

      const separatedQuestions = separateUpdateAndCreateItems(
        foundSection.questions,
      );
      await updateQuestions(formSection, separatedQuestions);
      await createQuestions(separatedQuestions.toCreate, formSection);
      await formSection.save();
    }
  }
};

const createSections = async (separatedSections, form) => {
  for (const bodySection of separatedSections.toCreate) {
    const newSection = new Section({
      title: bodySection.title,
      description: bodySection.description,
      form,
    });
    await createQuestions(bodySection.questions, newSection);
    await newSection.save();
    form.sections = [...form.sections, newSection];
  }
};

const updateQuestions = async (formSection, separatedQuestions) => {
  for (const formQuestion of formSection.questions) {
    const foundQuestion = findUpdatedItem(separatedQuestions, formQuestion);
    if (!foundQuestion) {
      await deleteQuestionAndUpdateSection(formQuestion._id, formSection);
    } else {
      formQuestion.description = foundQuestion.description;
      formQuestion.model = foundQuestion.model;
      formQuestion.other = foundQuestion.other;
      formQuestion.primaryKey = foundQuestion.primaryKey;
      formQuestion.title = foundQuestion.title;
      formQuestion.type = foundQuestion.type;

      const separatedOptions = separateUpdateAndCreateItems(
        foundQuestion.options,
      );
      await updateOptions(formQuestion, separatedOptions);
      await createOptions(separatedOptions.toCreate, formQuestion);

      const separatedValidations = separateUpdateAndCreateItems(
        foundQuestion.validations,
      );
      await updateValidations(formQuestion, separatedValidations);
      await createValidations(separatedValidations.toCreate, formQuestion);
      await formQuestion.save();
    }
  }
};

const updateOptions = async (formQuestion, separatedOptions) => {
  for (const formOption of formQuestion.options) {
    const foundOption = findUpdatedItem(separatedOptions, formOption);
    if (!foundOption) {
      await deleteOptionAndUpdateQuestion(formOption._id, formQuestion);
    } else {
      formOption.text = foundOption.text;
      await formOption.save();
    }
  }
};

const updateValidations = async (formQuestion, separatedValidations) => {
  for (const formValidation of formQuestion.validations) {
    const foundValidation = findUpdatedItem(
      separatedValidations,
      formValidation,
    );
    if (!foundValidation) {
      await deleteValidationAndUpdateQuestion(formValidation._id, formQuestion);
    } else {
      formValidation.operator = foundValidation.operator;
      formValidation.expression = foundValidation.expression;
      await formValidation.save();
    }
  }
};

const createQuestions = async (questions, formSection) => {
  for (const bodyQuestion of questions) {
    const newQuestion = new Question({
      description: bodyQuestion.description,
      model: bodyQuestion.model,
      other: bodyQuestion.other,
      primaryKey: bodyQuestion.primaryKey,
      title: bodyQuestion.title,
      type: bodyQuestion.type,
      section: formSection,
    });
    await createOptions(bodyQuestion.options, newQuestion);
    await createValidations(bodyQuestion.validations, newQuestion);
    await newQuestion.save();
    formSection.questions = [...formSection.questions, newQuestion];
  }
};

const createOptions = async (options, formQuestion) => {
  for (const bodyOption of options) {
    const newOption = new Option({
      text: bodyOption.text,
      question: formQuestion,
    });
    await newOption.save();
    formQuestion.options = [...formQuestion.options, newOption];
  }
};

const createValidations = async (validations, formQuestion) => {
  for (const bodyValidation of validations) {
    const newValidation = new Validation({
      operator: bodyValidation.operator,
      expression: bodyValidation.expression,
      question: formQuestion,
    });
    await newValidation.save();
    formQuestion.validations = [...formQuestion.validations, newValidation];
  }
};

const deleteForm = async (req, res) => { };

module.exports = {
  processForm,
  getFormList,
  createForm,
  updateForm,
  deleteForm,
};
