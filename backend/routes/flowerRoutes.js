const express = require('express')
const router = express.Router()
const { getSingleFlower,
        getFlowers, 
        setFlower, 
        updateFlower, 
        deleteFlower} = require('../controllers/flowerController')


router.get('/', getFlowers)
router.get('/:id', getSingleFlower)
router.post('/', setFlower)
router.patch('/:id', updateFlower)
router.delete('/:id', deleteFlower)


module.exports = router