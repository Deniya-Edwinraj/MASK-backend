import mongoose from "mongoose";

const contactSchema= mongoose.Schema(
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
        message: {
            type: String,
            required: true
        },
        status: {
            type: String,
        }
    },
    { timestamps: true }
);

const contactModel = mongoose.model('Contact', contactSchema);

export default contactModel;

