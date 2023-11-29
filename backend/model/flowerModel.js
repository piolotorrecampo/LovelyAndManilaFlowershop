const mongoose = require('mongoose')

const flowerSchema = mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: true,
    },
    color: {
        type: String,
        required: true,
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

module.exports = mongoose.model('Flower', flowerSchema)