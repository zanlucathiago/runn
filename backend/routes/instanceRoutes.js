const express = require('express');
const router = express.Router();
const {
  createInstance,
  getInstanceList,
} = require('../controllers/instanceController');

router.route('/:id').get(getInstanceList).post(createInstance);

module.exports = router;
