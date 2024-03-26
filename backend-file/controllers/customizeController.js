import asyncHandler from 'express-async-handler';
import customizeModel from '../models/customizeModal.js';
import slugify from 'slugify';


// create new 
const createCustomize = asyncHandler(async (req, res) => {
    try {
        if (req.body.product_name) {
            req.body.slug = slugify(req.body.product_name);
        }
        const newCustomize = await customizeModel.create(req.body);
        res.json(`Successfully Submitted`);
    } catch (error) {
        throw new Error(error);
    }
});


// get all 
const getallCustomize = asyncHandler(async (req, res) => {
    try {
        const allCustomize = await customizeModel.find();
        res.json(allCustomize);
    } catch (error) {
        throw new Error(error);
    }
});

// get a customize choice
const getaCustomize = asyncHandler(async (req, res) => {
    const { id } = req.params;
  
    try {
      const foundCustomize = await customizeModel.findById(id);
  
      if (!foundCustomize) {
        return res.status(404).json({ error: 'Customize not found' });
      }
  
      res.json({
        Customize: foundCustomize,
      });
    } catch (error) {
      console.error('Error getting customize:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

export {
    createCustomize,
    getallCustomize,
    getaCustomize
};