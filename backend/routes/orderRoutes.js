const express = require('express')
const router = express.Router()
const { getSingleOrder,
        getOrders, 
        setOrder, 
        updateOrder, 
        deleteOrder} = require('../controllers/orderController')


router.get('/', getOrders)
router.get('/:id', getSingleOrder)
router.post('/', setOrder)
router.patch('/:id', updateOrder)
router.delete('/:id', deleteOrder)


module.exports = router