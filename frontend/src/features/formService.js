import axios from 'axios';

const API_URL = '/api/forms/';

// Create new form
// const createForm = async (formData, token) => {
const createForm = (formData) => async () => {
  // const config = {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // }

  // const response = await axios.post(API_URL, formData, config)
  const response = await axios.post(
    API_URL,
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
  );

  return response.data;
};

// Get user forms
// const getForms = async (token) => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   }

//   const response = await axios.get(API_URL, config)

//   return response.data
// }

// Delete user form
// const deleteForm = async (formId, token) => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   }

//   const response = await axios.delete(API_URL + formId, config)

//   return response.data
// }

const formService = {
  createForm,
  // getForms,
  // deleteForm,
};

export default formService;
