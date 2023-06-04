const express = require('express');

const router = express.Router();
const {
  getDateList,
} = require('../controllers/validationController');

router.route('/:id').get(getDateList);

module.exports = router;
