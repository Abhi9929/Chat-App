import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import userRoute from './routes/user.route.js';
import messageRoute from './routes/message.route.js';
import { ApiError } from './utils/ApiError.js';

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(cookieParser())


app.use('/api/v1/users', userRoute)
app.use('/api/v1/messages', messageRoute)

app.get('/', (req, res) => {
  return res.send('hello');
});

// Error handling middleware
app.use((err, req, res, next) => {
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({
      message: err.message,
      errors: err.errors, // Optional: Include detailed error details if needed
    });
  } else {
    // Handle unknown errors (e.g., logging, sending generic error messages)
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
  next();
});

export default app;
