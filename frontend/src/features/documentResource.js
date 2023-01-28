import axios from 'axios';

const API_URL = '/api/d/e/';

const createDocument = (id, document) =>
  axios.post(`${API_URL}${id}`, document).then((response) => response.data);

const getDocumentList = (id) =>
  axios.get(`${API_URL}${id}`).then((response) => response.data);

const documentResource = {
  createDocument,
  getDocumentList,
};

export default documentResource;
