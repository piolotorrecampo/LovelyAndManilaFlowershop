const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: true,
    },
    flowerType: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    ocassion: [{
        type: String,
    },],
    category: {
        type: String,
    },
    views: {
        type: Number,
    },
    addToCart: {
        type: Number,
    },
    purchased: {
        type: Number,
    },
    image: {
        publicId: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        }
    }
}, {
    timestamps: true,
})

module.exports = mongoose.model('Product', productSchema)