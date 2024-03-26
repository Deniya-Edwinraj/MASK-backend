import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        email :{
            type: String,
            required: true
        },
        phoneNo: {
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
        totalprice: {
            type: Number,
            required: true,
            default: 0.0
        },
        orderItems: {
            type: String,
            required: true,
            ref: 'Product'
        },
        paymentMethod: {
            type: String,
            required: true,
        },
    status: {
        type: String,
        default: 'Processing'
    },
    deliveryAt :{
        type: Date
    },
    deliveryCharge: {
        type: Number,
        default: 0.0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
},
{ timestamps: true }
);


const orderModel = mongoose.model('Order', orderSchema);

export default orderModel;