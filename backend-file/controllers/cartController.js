import asyncHandler from 'express-async-handler';

const addToCart = asyncHandler(async (req, res) => {
    const { userId, productId, quantity } = req.body;
  
    try {
      const user = await User.findById(userId);
  
      if (user) {
        const product = await Product.findById(productId);
  
        if (product) {
          const item = user.cart.items.find((item) => item.product.toString() === productId);
  
          if (item) {
            item.quantity += quantity;
          } else {
            user.cart.items.push({ product: productId, quantity });
          }
  
          user.cart.totalPrice += product.price * quantity;
  
          const updatedUser = await user.save();
  
          res.status(200).json({
            message: 'Item added to cart',
            cart: updatedUser.cart
          });
        } else {
          res.status(404);
          throw new Error('Product not found');
        }
      } else {
        res.status(404);
        throw new Error('User not found');
      }
    } catch (error) {
      res.status(400);
      throw new Error('Error adding item to cart');
    }
  });

  export default addToCart;