const express = require('express');
const router = express.Router();
const { createInstance } = require('../controllers/instanceController');

router.route('/:id').post(createInstance);

module.exports = router;
