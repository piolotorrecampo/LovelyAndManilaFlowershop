const Ocassion = require('../model/ocassionModel')
const { uploadToCloudinary } = require('../utils/cloudinary')
const mongoose = require('mongoose')

// Get all ocassions
const getOcassions = async(req, res) => {
    try {
        const ocassion = await Ocassion.find({})
        res.status(200).json(ocassion)
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Server error"})
    }
}

// Get single ocassion
const getSingleOcassion = async(req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Ocassion not found'})
    }

    const ocassion = await Ocassion.findById(id)

    if (!ocassion) {
        return res.status(404).json({error: 'Ocassion not found'})
    }

    res.status(200).json(ocassion)
}

// Add Ocassion
const setOcassion = async (req, res) => {
    const { title, image } = req.body
    
    try {
        let imageData = {}
        if (image) {
            const results = await uploadToCloudinary(image, "ocassions")
            imageData = results
        }

        const ocassion = await Ocassion.create({ title, image: imageData })
        res.status(200).json(ocassion)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// Update an ocassion
const updateOcassion = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'Ocassion not found'})
    }

    const { title, image } = req.body

    const ocassion = await Ocassion.findOneAndUpdate({_id: id}, { title, image})

    if (!ocassion) {
        return res.status(400).json({error: 'Ocassion not found'})
    }

    res.status(200).json(ocassion)
}

// Delete an Ocassion
const deleteOcassion = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'Ocassion not found'})
    }

    const ocassion = await Ocassion.findOneAndDelete({_id: id})

    if(!ocassion) {
        return res.status(400).json({error: 'Ocassion not found'})
    }

    res.status(200).json(ocassion)
}

module.exports = {
    getSingleOcassion,
    getOcassions,
    setOcassion,
    updateOcassion,
    deleteOcassion,
}