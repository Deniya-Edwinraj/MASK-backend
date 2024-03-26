import asyncHandler from 'express-async-handler';
import Booking from '../models/bookingModel.js';
import User from '../models/userModel.js';
import nodemailer from 'nodemailer';

//Create New Booking - api/booking/new
const newBooking = asyncHandler(async (req, res, next) => {
    try {
        const {
            function_type,
            theme,
            date_of_delivery,
            description,
            // image,
            name,
            email,
            phoneNo,
            address,
            district,
            // status,
            paymentInfo,
        } = req.body;

        console.log("Request User:", req.user);

        const booking = await Booking.create({
            function_type,
            theme,
            date_of_delivery,
            description,
            // image,
            name,
            email,
            phoneNo,
            address,
            district,
            // status,
            paymentInfo,
        });
        if (booking.errors) {
            console.log('Validation Errors:', booking.errors);
        }
    

        if (booking) {

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.GMAIL,
                    pass: process.env.PASS,
                },

            });

            const mailOptions = {
                from: 'deniyaedwinraj@gmail.com',
                to: req.body.email, 
                subject: 'Booking Confirmation',
                text: 'Thank you for your booking with MASK. We appreciate your trust in MASK. If you have any further questions or require assistance, feel free to contact us.',
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    res.status(500).json({ error: 'Internal Server Error' });
                } else {
                    console.log('Email sent:', info.response);
                    res.status(200).json('Booking created successfully');
                }
            });
        } else {
            console.error("Booking creation failed");
            res.status(400).json({ error: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});




//Get Single Booking - api/booking/:id
// const getSingleBooking = asyncHandler(async (req, res, next) => {
//     const booking = await Booking.findById(req.params.id);
//     if(!booking) {
//         return next(new ErrorHandler(`Booking not found with this id: ${req.params.id}`, 404))
//     }

//     res.status(200).json({
//         success: true,
//         booking
//     })
// });

//Get Loggedin User Bookings - /api/booking/
const myBooking = asyncHandler(async (req, res, next) => {
    const bookings = await Booking.find({user: req.user.id});

    res.status(200).json({
        success: true,
        bookings
})
});

// Admin: Get All Bookings - api/booking/bookings
// const getAllBookings = asyncHandler(async (req, res, next) => {
//   const bookings = await Booking.find();
//   console.log(bookings);
//   if (!bookings) {
//       return next(new ErrorHandler('No bookings found', 404));
//   }

// });

// 
const getAllBookings = asyncHandler(async (req, res, next) => {
    try {
        const getBooking = await Booking.find();
        res.json(getBooking);
      } catch (error) {
        throw new Error(error);
      }
  });

//Admin: Update Booking / Booking Status - api/v1/booking/:id
const updateBooking = asyncHandler(async (req, res, next) => {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
        return next(new ErrorHandler('Booking not found', 404));
    }

    if (booking.bookingStatus === 'Delivered') {
        return next(new ErrorHandler('Booking has already been delivered!', 400));
    }

    booking.bookingStatus = req.body.bookingStatus || booking.bookingStatus;
    booking.deliveredAt = req.body.deliveredAt || Date.now();

    await booking.save();

    res.status(200).json({ message: 'Updated successfully' });
});

// Admin: Delete Booking - api/v1/order/:id
const deleteBooking = asyncHandler(async (req, res, next) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) {
      return next(new ErrorHandler(`Booking not found with this id: ${req.params.id}`, 404));
  }

  await Booking.deleteOne({ _id: req.params.id }); // Use deleteOne to remove the order
  res.status(200).json(`Booking deleted successfully`);
});

export {
    newBooking,
    // getSingleBooking,
    myBooking,
    getAllBookings,
    updateBooking,
    deleteBooking
};