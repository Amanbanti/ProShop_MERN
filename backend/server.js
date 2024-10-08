import express from 'express';
import productRoute from './routes/productRoute.js';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { notFound,errorHandler } from './middleware/errorMiddleware.js';
dotenv.config();

const port = process.env.PORT || 5000;
const app = express();

app.get('/', (req, res) => {
  res.send('API is Running...');
});

app.use('/api/products', productRoute);
app.use(notFound);
app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log('Server running on port ' + port);
    });
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1); // Exit process with failure
  }
};

startServer();
