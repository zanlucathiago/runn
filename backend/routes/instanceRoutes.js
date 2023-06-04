const express = require('express');

const router = express.Router();
const {
  createInstance,
  getInstance,
  getInstanceList,
} = require('../controllers/instanceController');

router.route('/:id/view').get(getInstance);
router.route('/:id').get(getInstanceList).post(createInstance);

module.exports = router;
