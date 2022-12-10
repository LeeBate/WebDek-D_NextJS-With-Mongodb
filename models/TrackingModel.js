
import  Mongoose  from "mongoose";

const Tracking = new Mongoose.Schema({
    rnb: {
        type: String,
        require: true,
        trim: true,
    },
    timeIn: {
        type: String,
        require: true,
    },
    timeOut: {
        type: String,
        require: true,
    },
    serviceNumber: {
        type: String,
        require: true,
        trim: true,
    },
    reportNumber: {
        type: String,
        require: true,
        trim: true,
    },
    pdf:{
        type: String,
        require: true,

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
    },
})

let Dataset = mongoose.models.Tracking || mongoose.model('Tracking', Tracking)
export default Dataset