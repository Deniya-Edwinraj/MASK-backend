import express from 'express';
import { 
    newOrder,
    // getSingleOrder, 
    myOrders, 
    getAllOrders, 
    updateOrder, 
    deleteOrder, 
} from '../../controllers/orderController.js';
const router = express.Router();
import { isAdmin,protect} from '../../middleware/authMiddlesware.js';


router.post("/new", newOrder);
// router.get('/:id',protect,getSingleOrder);
router.get('/',protect,myOrders);

//Admin Routes
router.get('/orders', getAllOrders);
router.put('/:id',updateOrder);
router.delete('/:id',protect,isAdmin,deleteOrder);

export default router;