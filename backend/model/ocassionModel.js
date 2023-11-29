const mongoose = require('mongoose')

const ocassionSchema = mongoose.Schema({
    title: {
        type: String,
        unique: true,
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

module.exports = mongoose.model('Ocassion', ocassionSchema)