import mongoose from 'mongoose'

const NewsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    images: {
        type: Array,
        required: true,
    },
    checked: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
})

let Dataset = mongoose.models.news || mongoose.model('news', NewsSchema)
export default Dataset