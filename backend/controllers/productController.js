const Product = require('../model/productModel')
const { uploadToCloudinary } = require('../utils/cloudinary')
const mongoose = require('mongoose')

// Get all products
const getProducts = async(req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).json(products)
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Server error"})
    }
}

// Get single products
const getSingleProduct = async(req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Product not found'})
    }

    const products = await Product.findById(id)

    if (!products) {
        return res.status(404).json({error: 'Product not found'})
    }

    res.status(200).json(products)
}

// Add Product
const setProduct = async (req, res) => {
    const { title, flowerType, price, description, ocassion, category, views, addToCart, purchased, image } = req.body
    
    try {
        let imageData = {}
        if (image) {
            const results = await uploadToCloudinary(image, "products")
            imageData = results
        }

        const products = await Product.create({ title, flowerType, price, description, ocassion, category, views, addToCart, purchased, image: imageData })
        res.status(200).json(products)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// Update an products
const updateProduct = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'Product not found'})
    }

    const products = await Product.findOneAndUpdate({_id: id}, { ...req.body })

    if (!products) {
        return res.status(400).json({error: 'Product not found'})
    }

    res.status(200).json(products)
}

// Delete an Product
const deleteProduct = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'Product not found'})
    }

    const products = await Product.findOneAndDelete({_id: id})

    if(!products) {
        return res.status(400).json({error: 'Product not found'})
    }

    res.status(200).json(products)
}

module.exports = {
    getSingleProduct,
    getProducts,
    setProduct,
    updateProduct,
    deleteProduct,
}