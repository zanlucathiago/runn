import axios from 'axios';

const API_URL = '/api/d/';

const createForm = () => axios.post(API_URL).then((response) => response.data);

const saveForm = (formData, id) => () =>
  axios
    .put(
      `${API_URL}${id}`,
      formData.map((section) => ({
        description: section.description,
        questions: section.questions.map((question) => ({
          description: question.description,
          model: question.model,
          title: question.title,
          type: question.type,
        })),
        title: section.title,
      }))
    )
    .then((response) => response.data);

const getForm = (id) =>
  axios.get(`${API_URL}${id}`).then((response) => response.data);

const getFormList = () => axios.get(API_URL).then((response) => response.data);

const formService = {
  createForm,
  getForm,
  getFormList,
  saveForm,
};

export default formService;
