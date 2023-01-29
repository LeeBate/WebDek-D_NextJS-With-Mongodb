
import  mongoose  from "mongoose";

const Tracking = new mongoose.Schema({
    // rnb: {
    //     type: String,
    //     require: true,
    //     trim: true,
    // },
    // timeIn: {
    //     type: String,
    //     require: true,
    // },

    timeOut: {
        type: String,
        require: true,
    },
    serviceNumber: {
        type: String,
        require: true,
        trim: true,
    },
    // reportNumber: {
    //     type: String,
    //     require: true,
    //     trim: true,
    // },
    images: {
        type: Array,
        required: true,

    },
    lsu: {
        type: String,
        require: true,
    },
    lab: {
        type: String,
        require: true,
    },
    procedure: {
        type: Array,
        require: true,
    },
    labPrint: {
        type: Array,
        require: true,
    },
    ensure: {
        type: Array,
        require: true,
    },

    checkReport:{
        type: Array,
        require: true,
    },

    ensureReport:{
        type: Array,
        require: true,
    },

    reportLSU: {
        type: Array,
        require: true,
    },
    note:{
        type: String,
        require: true,
        default: ""
    },
    phone:{
        type: String,
        require: true,
    },

    lastedit: {
        type: String,
    },
    repList: {
        type: Array,
    },
    repListDate: {
        type: Array,
    },
    sntime: {
        type: String,
    }

}, {
    timestamps: true
})

let Dataset = mongoose.models.Tracking || mongoose.model('Tracking', Tracking)
export default Dataset