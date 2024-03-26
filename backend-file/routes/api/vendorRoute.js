import express from 'express';
import {
    createVendor,
    getallVendors,
    getaVendor,
    updateaVendor,
    deleteaVendor
} from '../../controllers/vendorController.js';

const router = express.Router();
import {isAdmin,protect} from '../../middleware/authMiddlesware.js';

router.post("/new", createVendor);
router.get("/", getallVendors);
router.get("/:id", getaVendor);
router.put("/:id",updateaVendor);
router.delete("/:id", deleteaVendor);

export default router;
