const Order = require('../model/orderModel')
const { uploadToCloudinary } = require('../utils/cloudinary')
const mongoose = require('mongoose')

// Get all orders
const getOrders = async(req, res) => {
    try {
        const order = await Order.find({})
        res.status(200).json(order)
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Server error"})
    }
}

// Get single order
const getSingleOrder = async(req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Order not found'})
    }

    const order = await Order.findById(id)

    if (!order) {
        return res.status(404).json({error: 'Order not found'})
    }

    res.status(200).json(order)
}

// Add Order
const setOrder = async (req, res) => {
    const { customerName, phoneNumber, email, pickupDate, message, state, order } = req.body
    
    try {
        const orderStructure = await Order.create({ customerName, phoneNumber, email, pickupDate, message, state, order })
        res.status(200).json(orderStructure)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// Update an order
const updateOrder = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'Order not found'})
    }

    const products = await Order.findOneAndUpdate({_id: id}, { ...req.body })

    if (!products) {
        return res.status(400).json({error: 'Order not found'})
    }

    res.status(200).json(products)
}

// Delete an Order
const deleteOrder = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'Order not found'})
    }

    const order = await Order.findOneAndDelete({_id: id})

    if(!order) {
        return res.status(400).json({error: 'Order not found'})
    }

    res.status(200).json(order)
}

module.exports = {
    getSingleOrder,
    getOrders,
    setOrder,
    updateOrder,
    deleteOrder,
}