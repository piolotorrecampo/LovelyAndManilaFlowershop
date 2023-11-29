const Flower = require('../model/flowerModel')
const { uploadToCloudinary } = require('../utils/cloudinary')
const mongoose = require('mongoose')

// Get all flowers
const getFlowers = async(req, res) => {
    try {
        const flower = await Flower.find({})
        res.status(200).json(flower)
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Server error"})
    }
}

// Get single flower
const getSingleFlower = async(req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Flower not found'})
    }

    const flower = await Flower.findById(id)

    if (!flower) {
        return res.status(404).json({error: 'Flower not found'})
    }

    res.status(200).json(flower)
}

// Add Flower
const setFlower = async (req, res) => {
    const { title, color, image } = req.body
    
    try {
        let imageData = {}
        if (image) {
            const results = await uploadToCloudinary(image, "flowers")
            imageData = results
        }

        const flower = await Flower.create({ title, color, image: imageData })
        res.status(200).json(flower)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// Update an flower
const updateFlower = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'Flower not found'})
    }

    const { title, image } = req.body

    const flower = await Flower.findOneAndUpdate({_id: id}, { title, image})

    if (!flower) {
        return res.status(400).json({error: 'Flower not found'})
    }

    res.status(200).json(flower)
}

// Delete an Flower
const deleteFlower = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'Flower not found'})
    }

    const flower = await Flower.findOneAndDelete({_id: id})

    if(!flower) {
        return res.status(400).json({error: 'Flower not found'})
    }

    res.status(200).json(flower)
}

module.exports = {
    getSingleFlower,
    getFlowers,
    setFlower,
    updateFlower,
    deleteFlower,
}