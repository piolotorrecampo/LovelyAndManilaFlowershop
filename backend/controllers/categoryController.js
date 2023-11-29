const Category = require('../model/categoryModel')
const { uploadToCloudinary } = require('../utils/cloudinary')
const mongoose = require('mongoose')

// Get all categories
const getCategories = async(req, res) => {
    try {
        const category = await Category.find({})
        res.status(200).json(category)
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Server error"})
    }
}

// Get single category
const getSingleCategory = async(req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Category not found'})
    }

    const category = await Category.findById(id)

    if (!category) {
        return res.status(404).json({error: 'Category not found'})
    }

    res.status(200).json(category)
}

// Add Category
const setCategory = async (req, res) => {
    const { title, image } = req.body
    
    try {
        let imageData = {}
        if (image) {
            const results = await uploadToCloudinary(image, "category")
            imageData = results
        }

        const category = await Category.create({ title, image: imageData })
        res.status(200).json(category)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// Update an category
const updateCategory = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'Category not found'})
    }

    const { title, image } = req.body

    const category = await Category.findOneAndUpdate({_id: id}, { title, image})

    if (!category) {
        return res.status(400).json({error: 'Category not found'})
    }

    res.status(200).json(category)
}

// Delete an Category
const deleteCategory = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'Category not found'})
    }

    const category = await Category.findOneAndDelete({_id: id})

    if(!category) {
        return res.status(400).json({error: 'Category not found'})
    }

    res.status(200).json(category)
}

module.exports = {
    getSingleCategory,
    getCategories,
    setCategory,
    updateCategory,
    deleteCategory,
}