import { Request, Response } from 'express';
import { BookingService } from '../services/booking.service';
import { CreateBookingDto } from '../dtos';

const bookingService = new BookingService();

export class BookingController {
  async createBooking(req: Request, res: Response): Promise<void> {
    try {
      // Ensure user is authenticated
      if (!req.user || !req.user.userId) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }
      
      const userId = req.user.userId;
      const bookingData: CreateBookingDto = {
        serviceId: parseInt(req.body.serviceId),
        providerId: parseInt(req.body.providerId),
        date: new Date(req.body.date),
      };
      
      // Validate booking data
      if (isNaN(bookingData.serviceId) || isNaN(bookingData.providerId) || isNaN(bookingData.date.getTime())) {
        res.status(400).json({ message: 'Invalid booking data' });
        return;
      }
      
      const booking = await bookingService.createBooking(userId, bookingData);
      res.status(201).json(booking);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'This time slot is already booked') {
          res.status(409).json({ message: error.message });
          return;
        }
        if (error.message === 'Service not found') {
          res.status(404).json({ message: error.message });
          return;
        }
      }
      res.status(500).json({ message: 'Error creating booking', error });
    }
  }

  async getUserBookings(req: Request, res: Response): Promise<void> {
    try {
      // Ensure user is authenticated
      if (!req.user || !req.user.userId) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }
      
      const userId = req.user.userId;
      const bookings = await bookingService.findUserBookings(userId);
      res.status(200).json(bookings);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching bookings', error });
    }
  }
}