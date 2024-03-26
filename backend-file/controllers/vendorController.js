import asyncHandler from 'express-async-handler'
import vendorModel from '../models/vendorModel.js';
import slugify from 'slugify';

// create new vendor
const createVendor = asyncHandler(async (req, res) => {
  try {
    if (req.body.name) {
      req.body.slug = slugify(req.body.name);
    }
    const newVendor = await vendorModel.create(req.body);

    // Respond with the created vendor or a success message
    res.json({ message: 'Vendor created successfully', vendor: newVendor });
  } catch (error) {
    console.error('Error creating vendor:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


  // get all vendors 
const getallVendors = asyncHandler(async (req, res) => {
    try {
        const allVendors = await vendorModel.find();
        res.json(allVendors);
    } catch (error) {
        throw new Error(error);
    }
});

// get a vendor
const getaVendor = asyncHandler(async (req, res) => {
    const { id } = req.params;
  
    try {
      const foundVendor = await vendorModel.findById(id);
  
      if (!foundVendor) {
        return res.status(404).json({ error: 'Vendor not found' });
      }
  
      res.json({
        vendor: foundVendor,
      });
    } catch (error) {
      console.error('Error getting vendor:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

// update a vendor
const updateaVendor = asyncHandler(async (req, res) => {
  try {
    const vendorId = req.params.id;
    const updatedVendor = await vendorModel.findByIdAndUpdate(
      vendorId,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedVendor) {
      res.status(404).json({ error: 'Vendor not found' });
      return;
    }

    res.json({ message: 'Vendor updated successfully', vendor: updatedVendor });
  } catch (error) {
    console.error('Error updating vendor:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a vendor
const deleteaVendor = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
      const deleteaVendor = await vendorModel.findByIdAndDelete(id);
      res.json({
        deleteaVendor,
      });
    } catch (error) {
      throw new Error(error);
    }
  });

  
export {
    createVendor,
    getallVendors,
    getaVendor,
    updateaVendor,
    deleteaVendor
}