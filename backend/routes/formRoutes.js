const express = require('express')
const router = express.Router()
const {
  getForms,
  setForm,
  updateForm,
  deleteForm,
} = require('../controllers/formController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getForms).post(protect, setForm)
router.route('/:id').delete(protect, deleteForm).put(protect, updateForm)

module.exports = router