import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

// Import routes
import serviceRoutes from './routes/service.routes';
import providerRoutes from './routes/provider.routes';
import bookingRoutes from './routes/booking.routes';
import authRoutes from './routes/auth.routes';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());

// Routes
app.use('/api/services', serviceRoutes);
app.use('/api/providers', providerRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/auth', authRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint not found' });
});

// Start server
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

export default app;