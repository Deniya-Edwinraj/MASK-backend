import express from 'express';
import{
    newBooking,
    // getSingleBooking,
    myBooking,
    getAllBookings,
    updateBooking,
    deleteBooking 
} from '../../controllers/bookingController.js';
const router = express.Router();
import { isAdmin,protect} from '../../middleware/authMiddlesware.js';

router.post("/new", newBooking);
// router.get('/:id',protect, getSingleBooking );
router.get('/',protect,myBooking);

//Admin Routes
router.get('/bookings', getAllBookings);
router.put('/:id',updateBooking);
router.delete('/:id',protect,isAdmin,deleteBooking);

export default router;