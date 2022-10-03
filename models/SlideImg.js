import mongoose from 'mongoose'

const slideSchema = new mongoose.Schema({
    images: {
        type: Array,
        required: true,

    },
    category: {
        type: String,
        required: true,
        default:"default"
    },
    checked: {
        type: Boolean,
        default: false,
        default:false
    },
    title: {
        type: String,
        required: true,
        trim: true,
        default:"default"
    },
    en: {
        type: String,
        required: true,
        trim: true,
        default:"default"
    },
    brand: {
        type: String,
        required: true,
        trim: true,
        default:"default"
    },
    modelName: {
        type: String,
        required: true,
        trim: true,
        default:"default"
    },
    room: {
        type: String,
        required: true,
        trim: true,
        default:"default"
    },
    roomen: {
        type: String,
        required: true,
        trim: true,
        default:"default"
    },
    manager: {
        type: String,
        required: true,
        trim: true,
        default:"default"
    },
    detailCapability: {
        type: String,
        required: true,
        trim: true,
        default:"default"
    },
    detailRestrictions: {
        type: String,
        required: true,
        trim: true,
        default:"default"
    },
    nameRate: {
        type: Array,
        required: true,
        default:[{sdsd:"jdjd"}]
    },

}, {
    timestamps: true
})

let Dataset = mongoose.models.slideImg || mongoose.model('slideImg', slideSchema)
export default Dataset