import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import { errorHandler } from './middlewares/errorHandler';
import { authRoutes } from './routes/auth.routes';
import { usersRoutes } from './routes/users.routes';
import { productsRoutes } from './routes/products.routes';

const app = express();

// Global Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Routes
app.use('/auth', authRoutes);
app.use('/users', usersRoutes);
app.use('/products', productsRoutes);

// Error middleware
app.use(errorHandler);

export { app };