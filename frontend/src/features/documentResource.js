import axios from 'axios';

const API_URL = '/api/d/e/';

const createDocument = (id, document) => axios.post(`${API_URL}${id}`, document).then((response) => response.data);

const getDocumentList = (id) => axios.get(`${API_URL}${id}`).then((response) => response.data);

const getDocument = (id, params) => axios.get(`${API_URL}${id}/view`, { params }).then((response) => response.data);

const documentResource = {
  createDocument,
  getDocument,
  getDocumentList,
};

export default documentResource;
