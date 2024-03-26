// import asyncHandler from 'express-async-handler';
// import Stripe from 'stripe';

// // Initialize Stripe with your secret key
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
//     apiVersion: '2020-08-27', // Use the latest API version
// });

// // Process stripe payments
// const processPayment = asyncHandler(async (req, res) => {
//     const paymentIntent = await stripe.paymentIntents.create({
//         amount: req.body.amount,
//         currency: 'usd',
//         metadata: { integration_check: 'accept_a_payment' },
//     });

//     res.status(200).json({
//         success: true,
//         client_secret: paymentIntent.client_secret,
//     });
// });

// const sendStripApi = asyncHandler(async (req, res) => {
//     res.status(200).json({
//         stripeApiKey: process.env.STRIPE_API_KEY,
//     });
// });

// export { processPayment, sendStripApi };

// import asyncHandler from 'express-async-handler';
// import Stripe from 'stripe';

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
//     apiVersion: '2020-08-27', 
// });

// const processPayment = asyncHandler(async (req, res) => {
//     const { amount, token } = req.body;

//     try {
//         const paymentIntent = await stripe.paymentIntents.create({
//             amount,
//             currency: 'usd',
//             payment_method: token,
//             confirmation_method: 'manual',
//             // confirm: true,
//         });

//         res.status(200).json({
//             success: true,
//             client_secret: paymentIntent.client_secret,
//         });
//     } catch (error) {
//         console.error('Error processing payment:', error);
//         res.status(500).json({ success: false, error: 'Error processing payment' });
//     }
// });

// const sendStripApi = asyncHandler(async (req, res) => {
//     res.status(200).json({
//         stripeApiKey: process.env.STRIPE_API_KEY,
//     });
// });


// export { processPayment, sendStripApi };

