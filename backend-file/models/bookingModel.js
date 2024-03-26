import mongoose from "mongoose";

const bookingSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    phoneNo: {
        type: String,
        required: true
    },
    function_type: {
        type: String,
        required: true
    },
    theme: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    // image: {
    //     public_id: {
    //         type: String,
    //         required: true
    //     },
    //     secure_url: {
    //         type: String,
    //         required: true
    //     }
    // },
    // status: {
    //     type: String,
    //     default: 'Processing'
    // },
    paymentInfo: {
        type: String
    },
    date_of_delivery: {
        type: Date,
    }
}, { timestamps: true });

const bookingModel = mongoose.model('Booking', bookingSchema);

export default bookingModel;
