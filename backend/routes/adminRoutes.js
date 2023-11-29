const express = require('express');
const router = express.Router();
const { getSingleAdmin, getAdmins, setAdmin, updateAdmin, deleteAdmin } = require('../controllers/adminController');

router.get('/', getAdmins);
router.get('/:id', getSingleAdmin);
router.post('/', setAdmin);
router.patch('/:id', updateAdmin);
router.delete('/:id', deleteAdmin);

module.exports = router;
