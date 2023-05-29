const express = require('express');
const router = express.Router();
const {
  processForm,
  getFormList,
  createForm,
  updateForm,
  deleteForm,
} = require('../controllers/formController');

router.route('/').get(getFormList).post(createForm);
router.route('/:id').get(processForm).delete(deleteForm).put(updateForm);

module.exports = router;
