const express = require('express');
const router = express.Router();
const {
  getForm,
  createForm,
  saveForm,
  deleteForm,
} = require('../controllers/formController');

router.route('/').post(createForm);
router.route('/:id').get(getForm).delete(deleteForm).put(saveForm);

module.exports = router;
