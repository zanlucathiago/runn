import axios from 'axios';

const API_URL = '/api/d/v/';

const getValidationList = (id) =>
  axios.get(`${API_URL}${id}`).then((response) => response.data);

export default {
  getValidationList,
};
