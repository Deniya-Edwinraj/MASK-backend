import express from 'express';

const router = express.Router();
import {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getallUser,
    getaUser,
    deleteaUser,
    blockUser
} from '../controllers/userController.js';
import { isAdmin,protect } from '../middleware/authMiddlesware.js';

router.post('/', registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router
.route('/profile')
.get( protect,getUserProfile)
.put( protect,updateUserProfile);
router.get('/all-users', getallUser);
router.get('/:id', getaUser);


//Admin Routes
router.delete('/:id',protect,isAdmin,deleteaUser);
router.post('/:userId', blockUser);

export default router;
