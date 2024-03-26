import mongoose from "mongoose";

const vendorSchema= mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

const vendorModel = mongoose.model('Vendor', vendorSchema);

export default vendorModel;