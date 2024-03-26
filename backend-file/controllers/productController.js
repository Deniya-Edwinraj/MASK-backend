import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';
import slugify from 'slugify';
import { JSONCookie } from 'cookie-parser';
import cloudinary from '../utils/cloudinary.js';
import multer from 'multer';

// create new product
// const createProduct = asyncHandler(async (req, res) => {
//    try {
//       if (req.body.name) {
//          req.body.slug = slugify(req.body.name);
//       }
//       const newProduct = await Product.create(req.body);
//       res.json(newProduct);
//     } catch (error) {
//       throw new Error(error);
//     }
// });
const createProduct = asyncHandler(async (req, res) => {
  try {
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "MASK"
      });

      req.body.image = [
        {
          public_id: result.public_id,
          secure_url: result.secure_url,
        },
      ];
    }

    if (req.body.name) {
      req.body.slug = slugify(req.body.name);
    }

    const newProduct = await Product.create(req.body);

    res.json({
      ...newProduct._doc,
      image: newProduct.image, 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// const createProduct = asyncHandler(async (req, res) => {
//   try {
//     let image = null;
//     if (req.body.image) {
//       image = {
//         data: Buffer.from(req.body.image, 'base64'),
//         contentType: 'image/png'  
//       };
//     }

//     if (req.body.name) {
//       req.body.slug = slugify(req.body.name);
//     }

//     const productData = {
//       name: req.body.name,
//       category: req.body.category,
//       price: req.body.price,
//       image: image,
//       sold: req.body.sold
//     };

//     const newProduct = await Product.create(productData);

//     res.json(newProduct);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });




// update product
// const updateProduct = asyncHandler(async (req, res) => {
//   const id = req.params.id;console.log(req.body);
//   try {
//     if (req.body.title) {
//       req.body.slug = slugify(req.body.title);
//     }
//     const updateProduct = await Product.findByIdAndUpdate( id,req.body, {
//       new: true,
//     });
//     res.json(updateProduct);
//   } catch (error) {
//     throw new Error(error);
//   }
// });
const updateProduct = asyncHandler(async (req, res) => {
  try {
    const productId = req.params.id;

    // Check if the product exists
    const existingProduct = await Product.findById(productId);

    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Image upload logic
    if (req.file) {
      // Remove existing images from Cloudinary
      existingProduct.image.forEach((image) => {
        cloudinary.uploader.destroy(image.public_id);
      });

      // Upload new images to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      req.body.image = [
        {
          public_id: result.public_id,
          secure_url: result.secure_url,
        },
        // ... add more images if needed
      ];
    }

    // Slug creation logic
    if (req.body.name) {
      req.body.slug = slugify(req.body.name);
    }

    // Update the product
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { $set: req.body },
      { new: true }
    );

    // Respond with success or redirect
    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// delete a product
const deleteProduct = asyncHandler(async (req, res) => {
  const id = req.params.id;
  try {
    const deleteProduct = await Product.findByIdAndDelete(id);
    res.json(deleteProduct);
  } catch (error) {
    throw new Error(error);
  }
});

// get a product
const getaProduct = asyncHandler(async (req, res) => {
   const { id } = req.params;
   try {
     const findProduct = await Product.findById(id);
     res.json(findProduct);
   } catch (error) {

     throw new Error(error);
   }
 });

// get all product 
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




export { 
   createProduct,
   getaProduct,
  //  getAllProduct,
   updateProduct,
   deleteProduct,
   getProducts
 };