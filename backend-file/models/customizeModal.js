import mongoose from "mongoose";

const customizeSchema= mongoose.Schema(
    {
        product: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        size: {
            type: String,
            required: true
        },
        colour: {
            type: String,
            required: true
        },
        extra_features: {
            type: String,
        }
    },
    { timestamps: true }
);

const customizeModel = mongoose.model('Customize', customizeSchema);

export default customizeModel;
