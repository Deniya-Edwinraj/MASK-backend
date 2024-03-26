import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';


//Create New Order - api/order/new
const newOrder =  asyncHandler( async (req, res, next) => {
    const {
        name,
        email,
        phoneNo,
        address,
        district,
        totalprice,
        orderItems,
        paymentMethod,
        orderStatus,
        paymentInfo,
        paidAt,
        deliveryAt,
        deliveryCharge,
        createdAt
    } = req.body;

    const order = await Order.create({
        name,
        email,
        phoneNo,
        address,
        district,
        totalprice,
        orderItems,
        paymentMethod,
        orderStatus,
        paymentInfo,
        paidAt,
        deliveryAt,
        deliveryCharge,
        createdAt
    })

    res.status(200).json(`Order created succesfully`)
});

//Get Single Order - api/order/:id
// const getSingleOrder = asyncHandler(async (req, res, next) => {
//     const order = await Order.findById(req.params.id).populate('user', 'name email');
//     if(!order) {
//         return next(new ErrorHandler(`Order not found with this id: ${req.params.id}`, 404))
//     }

//     res.status(200).json({
//         success: true,
//         order
//     })
// });

//Get Loggedin User Orders - /api/order/
const myOrders = asyncHandler(async (req, res, next) => {
    const orders = await Order.find({user: req.user.id});

    res.status(200).json({
        success: true,
        orders
})
});

//Admin: Get All Orders - api/order/orders
const getAllOrders = async (req, res) => {
    try {
      const orders = await Order.find().populate('orderItems.product');
  
      let totalAmount = 0;
  
      orders.forEach(order => {
        totalAmount += order.totalPrice;
      });
  
      res.status(200).json({
        success: true,
        totalAmount,
        orders
      });
    } catch (error) {
      console.error(error);
  
      res.status(500).json({
        success: false,
        message: 'Internal Server Error'
      });
    }
  };

//Admin: Update Order / Order Status - api/v1/order/:id
const updateOrder = asyncHandler(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (order.orderStatus === 'Delivered') {
        return next(new ErrorHandler('Order has already been delivered!', 400));
    }

    for (const orderItem of order.orderItems) {
        await updateStock(orderItem.product, orderItem.quantity);
    }

    order.orderStatus = req.body.orderStatus;
    order.deliveredAt = Date.now();
    await order.save();

    res.status(200).json(`Updated successfully`);
});

async function updateStock(productId, quantity) {
    const product = await Product.findById(productId);
    product.stock = product.stock - quantity;
    await product.save({ validateBeforeSave: false });
}


// Admin: Delete Order - api/v1/order/:id
const deleteOrder = asyncHandler(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
        return next(new ErrorHandler(`Order not found with this id: ${req.params.id}`, 404));
    }

    await Order.deleteOne({ _id: req.params.id }); // Use deleteOne to remove the order
    res.status(200).json(`Order deleted successfully`);
});


export { 
    newOrder,
    // getSingleOrder,
    myOrders,
    getAllOrders,
    updateOrder,
    deleteOrder,
  };