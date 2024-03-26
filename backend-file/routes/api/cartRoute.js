import express from 'express';
import addToCart from "../../controllers/cartController.js";

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    const result = await addToCart(req, res, { userId, productId, quantity });

    res.status(result.statusCode).json(result);
  } catch (error) {
    res.status(error.statusCode).json({ message: error.message });
  }
});

export default router;