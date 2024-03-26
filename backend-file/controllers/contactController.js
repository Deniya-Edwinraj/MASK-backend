import asyncHandler from 'express-async-handler';
import contactModel from '../models/contactModel.js';
import slugify from 'slugify';


// create new contact message
const createContactMessage = asyncHandler(async (req, res) => {
    try {
        if (req.body.name) {
            req.body.slug = slugify(req.body.name);
        }
        const newContactMessage = await contactModel.create(req.body);
        res.json(`Successfully Submitted`);
    } catch (error) {
        throw new Error(error);
    }
});

// get all contact messages 
const getallContact = asyncHandler(async (req, res) => {
    try {
        const allContacts = await contactModel.find();
        res.json(allContacts);
    } catch (error) {
        throw new Error(error);
    }
});

//Get Single message
const getSingleContact = asyncHandler(async (req, res, next) => {
    const contact = await contactModel.findById(req.params.id);
    if(!contact) {
        return next(new ErrorHandler(`Booking not found with this id: ${req.params.id}`, 404))
    }

    res.status(200).json({
        success: true,
        contact
    })
});

export {
    createContactMessage,
    getallContact,
    getSingleContact
};