const express = require('express')
const router = express.Router()
const { getSingleOcassion,
        getOcassions, 
        setOcassion, 
        updateOcassion, 
        deleteOcassion} = require('../controllers/ocassionController')


router.get('/', getOcassions)
router.get('/:id', getSingleOcassion)
router.post('/', setOcassion)
router.patch('/:id', updateOcassion)
router.delete('/:id', deleteOcassion)


module.exports = router