const express = require('express')
const router = express.Router()
const { getSingleProduct,
        getProducts, 
        setProduct, 
        updateProduct, 
        deleteProduct} = require('../controllers/productController')

router.get('/', getProducts)
router.get('/:id', getSingleProduct)
router.post('/', setProduct)
router.patch('/:id', updateProduct)
router.delete('/:id', deleteProduct)

module.exports = router