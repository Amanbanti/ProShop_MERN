import path from 'path';
import express from 'express';
import productRoute from './routes/productRoute.js';
import userRoute from './routes/userRoutes.js';
import orderRoute from './routes/orderRotes.js'
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import uploadRoutes from  './routes/uploadRoutes.js'

// Load environment variables from .env file
dotenv.config();

// Create Express app
const app = express();


// Get port from environment variables or set default to 5000
const port = process.env.PORT || 5000;

// Connect to the MongoDB database
const startServer = async () => {
  try {
    await connectDB();  // Ensure MongoDB connection is successful
    console.log('Connected to MongoDB successfully');

    // Start the server
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });

  } catch (error) {
    console.error('Failed to connect to MongoDB:', error.message);
    process.exit(1);  // Exit process with failure if connection fails
  }
};

//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());


// Users Routes
app.use('/api/users', userRoute);

// Product routes
app.use('/api/products', productRoute);


// Order routes
app.use('/api/orders', orderRoute);


app.use('/api/upload', uploadRoutes);

app.get('/api/config/paypal',(req,res)=> res.send({clientId:
process.env.PAYPAL_CLIENT_ID}))


const __dirname = path.resolve();// set __dirname to current directory

app.use('/uploads',express.static(path.join(__dirname,'/uploads')))


if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  // Any route that is not API will be redirected to index.html
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
}else{
      app.get('/', (req, res) => {
        res.send('API is Running...');
      });
  
}


// Error handling middleware
app.use(notFound);  // Handle 404 errors
app.use(errorHandler);  // Custom error handler

// Start the server
startServer();
