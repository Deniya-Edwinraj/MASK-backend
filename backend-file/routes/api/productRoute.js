import express from 'express';
import { 
  createProduct,
  getaProduct,
  // getAllProduct,
  getProducts,
  updateProduct,
  deleteProduct,
 } from '../../controllers/productController.js';
import { isAdmin,protect} from '../../middleware/authMiddlesware.js';
import upload from '../../utils/multer.js';

const router = express.Router();


router.get("/:id", getaProduct);
// router.get("/", getAllProduct);
router.get("/", getProducts);

//Admin Routes
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.post("/",upload.single('image'), createProduct);

export default router;