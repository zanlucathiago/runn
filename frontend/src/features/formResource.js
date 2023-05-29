import axios from 'axios';

const API_URL = '/api/d/';

const createForm = () => axios.post(API_URL).then((response) => response.data);

const updateForm = (formData, id) => () =>
  axios
    .put(
      `${API_URL}${id}`,
      formData.map((section) => ({
        description: section.description,
        questions: section.questions.map((question) => ({
          description: question.description,
          model: question.model,
          other: question.other,
          primaryKey: question.primaryKey,
          title: question.title,
          type: question.type,
          options: question.options.map((option) => ({ text: option.text })),
          validations: question.validations.map((validation) => ({
            expression: validation.expression,
            operator: validation.operator,
          })),
        })),
        title: section.title,
      }))
    )
    .then((response) => response.data);

const processForm = (id, params) => {
  return axios
    .get(`${API_URL}${id}`, { params })
    .then((response) => response.data);
};

const getFormList = () => axios.get(API_URL).then((response) => response.data);

const formResource = {
  createForm,
  processForm,
  getFormList,
  updateForm,
};

export default formResource;
