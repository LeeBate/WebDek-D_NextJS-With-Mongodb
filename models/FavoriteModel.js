import mongoose from 'mongoose'

const favoriteSchema = new mongoose.Schema({
    images: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    en: {
        type: String,
        required: true,
        trim: true
    },
    userid: {
        type: String,
        required: true,
        trim: true
    },
    prodid: {
        type: String,
        required: true,
        trim: true
    },

}, {
    timestamps: true
})

let Dataset = mongoose.models.favorite || mongoose.model('favorite', favoriteSchema)
export default Dataset