import { Router } from 'express';
import { BookingController } from '../controllers/booking.controller';
import { authenticateJwt } from '../middleware/auth.middleware';

const router = Router();
const bookingController = new BookingController();

// All booking routes require authentication
router.use(authenticateJwt as any); 

// POST /api/bookings - Create a new booking
router.post('/', bookingController.createBooking.bind(bookingController));

// GET /api/bookings - Get user's bookings
router.get('/', bookingController.getUserBookings.bind(bookingController));

export default router;