import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    images: {
        type: Array,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    checked: {
        type: Boolean,
        default: false
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
    brand: {
        type: String,
        required: true,
        trim: true
    },
    modelName: {
        type: String,
        required: true,
        trim: true
    },
    room: {
        type: String,
        required: true,
        trim: true
    },
    roomen: {
        type: String,
        required: true,
        trim: true
    },
    manager: {
        type: String,
        required: true,
        trim: true
    },
    detailCapability: {
        type: String,
        required: true,
        trim: true
    },
    detailRestrictions: {
        type: String,
        required: true,
        trim: true
    },
    nameRate: {
        type: Array,
        required: true
    },
    pdf: {
        type: Array,
    },
    video:{
        type: String,
    }
    
}, {
    timestamps: true
})

let Dataset = mongoose.models.product || mongoose.model('product', productSchema)
export default Dataset