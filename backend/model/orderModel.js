const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    customerName: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    email: {
        type: String
    },
    pickupDate: {
        type: String,
    },
    message: {
        type: String,
    },
    state: {
        type: String,
        required: true,
    },
    order: [{
        productId: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
    }],
}, {
    timestamps: true,
})

module.exports = mongoose.model('Order', orderSchema)