const express = require('express');
const router = express.Router();
const {
  getInstance,
  getInstanceList,
  createInstance,
  saveInstance,
  deleteInstance,
} = require('../controllers/instanceController');

router.route('/').get(getInstanceList).post(createInstance);
router.route('/:id').get(getInstance).delete(deleteInstance).put(saveInstance);

module.exports = router;
