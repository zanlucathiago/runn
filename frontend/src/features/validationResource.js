import axios from 'axios';

const API_URL = '/api/d/e/v/';

const getValidationList = (id, params) => axios.get(`${API_URL}${id}`, { params }).then((response) => response.data);

const validationResource = {
  getValidationList,
};

export default validationResource;
