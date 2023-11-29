const express = require('express')
const router = express.Router()
const { getSingleCategory,
        getCategories,
        setCategory,
        updateCategory,
        deleteCategory,} = require('../controllers/categoryController')

router.get('/', getCategories)
router.get('/:id', getSingleCategory)
router.post('/', setCategory)
router.patch('/:id', updateCategory)
router.delete('/:id', deleteCategory)


module.exports = router