import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
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
    fullname:{
        type: String,
        required: true

    },
    studentID: {
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true

    },
    phone:{
        type: String,
        required: true
    },
    dateBooking:{
        type: String,
   
        
    },
    dateBookingEnd:{
        type: String,
        
    },
    statusBooking :{
        type: String,
        
    },
    price:{
        type:Number,
    },
    calendarData: {
        type: Array,
    }
},{
    timestamps: true
})

let Dataset = mongoose.models.booking || mongoose.model('booking', bookingSchema)
export default Dataset