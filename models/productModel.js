import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    // title: {
    //     type: String,
    //     required: true,
    //     trim: true
    // },
    // price: {
    //     type: Number,
    //     required: true,
    //     trim: true
    // },
    // description: {
    //     type: String,
    //     required: true
    // },
    // content: {
    //     type: String,
    //     required: true
    // },
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
    // inStock: {
    //     type: Number,
    //     default: 0
    // },
    // sold: {
    //     type: Number,
    //     default: 0
    // },
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
    price1: {
        type: Number,
        required: true,
        trim: true
    },
    price2: {
        type: Number,
        required: true,
        trim: true
    },
    price3: {
        type: Number,
        required: true,
        trim: true
    },
    price4: {
        type: Number,
        required: true,
        trim: true
    },
    price5: {
        type: Number,
        required: true,
        trim: true
    },
}, {
    timestamps: true
})

let Dataset = mongoose.models.product || mongoose.model('product', productSchema)
export default Dataset