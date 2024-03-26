import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();
import cookieParser from 'cookie-parser';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import morgan from 'morgan';
import nodemailer from 'nodemailer';
// import connectDB from '../config/db.js';
const port = process.env.PORT || 5000;
const mongoString = process.env.MONGO_URI
const app = express();
mongoose.connect(mongoString)
const database = mongoose.connection
import userRoutes from './routes/userRoutes.js';
import productRouter from './routes/api/productRoute.js';
import orderRouter from './routes/api/orderRoute.js';
import contactRouter from './routes/api/contactRoute.js';
import bookingRouter from './routes/api/bookingRoute.js';
import customizeRouter from './routes/api/customizeRoute.js';
import vendorRouter from './routes/api/vendorRoute.js';
// import paymentRouter from './routes/api/paymentRoute.js';
import addtocartRouter from './routes/api/cartRoute.js'

import cors from 'cors';
import { isAdmin } from './middleware/authMiddlesware.js';

const corsInstance = cors({ origin: ['http://localhost:3000', 'http://localhost:5173'],credentials: true});
app.use(corsInstance);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use (morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extented: true}));

app.use(cookieParser());
// import { connect } from 'mongoose';

// connectDB();

app.use('/api/users', userRoutes);
app.use('/api/product', productRouter);
app.use('/api/order',orderRouter);
app.use('/api/contact',contactRouter);
app.use('/api/booking',bookingRouter);
app.use('/api/customize',customizeRouter);
app.use('/api/vendor',vendorRouter);
// app.use('/api/payment',paymentRouter);
app.use('/api/cart',addtocartRouter);

if (process.env.NODE_ENV === 'production') {
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, '/frontend-file/public')));
  
    app.get('*', (req, res) =>
      res.sendFile(path.resolve(__dirname, 'frontend-file', 'public', 'index.html'))
    );
  } else {
    app.get('/', (req, res) => {
      res.send('API is running....');
    });
  }


app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server stared on port ${port}`));

database.on ('error',(error) => {
    console.log(error)
})
database.once('connected' , ()=>{
    console.log('Database Connected')
})

// Your route with modified isAdmin middleware
app.get('/header', isAdmin, async (req, res) => {
  try {
    // Assume req.userRole is available after isAdmin middleware
    console.log('User Role:', req.userRole);

    // Render the Header component and pass the userRole as a prop
    res.render('header', { userRole: req.userRole });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});



const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: 'deniyaedwinraj@gmail.com',
      pass: 'xwqn hecr khsw goxg'
  }
});


export default transporter;