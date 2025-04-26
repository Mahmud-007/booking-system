import { PrismaClient, Booking } from '@prisma/client';
import { CreateBookingDto } from '../dtos';

const prisma = new PrismaClient();

export class BookingService {
  async createBooking(userId: number, bookingData: CreateBookingDto): Promise<Booking> {
    // Use transaction to ensure booking integrity
    return await prisma.$transaction(async (tx) => {
      // 1. Get the service to check duration
      const service = await tx.service.findUnique({
        where: { id: bookingData.serviceId },
      });
      
      if (!service) {
        throw new Error('Service not found');
      }
      
      // Calculate end time based on service duration
      const startTime = new Date(bookingData.date);
      const endTime = new Date(startTime.getTime() + service.duration * 60000);
      
      // 2. Check if provider is available at the requested time
      const existingBookings = await tx.booking.findMany({
        where: {
          providerId: bookingData.providerId,
          status: { in: ['pending', 'confirmed'] },
          OR: [
            // Booking starts during another booking
            {
              date: {
                gte: startTime,
                lt: endTime,
              },
            },
            // Booking ends during another booking
            {
              AND: {
                date: { lte: startTime },
                service: {
                  duration: {
                    gt: Math.floor(
                      (startTime.getTime() - new Date().getTime()) / 60000
                    ),
                  },
                },
              },
            },
          ],
        },
      });
      
      if (existingBookings.length > 0) {
        throw new Error('This time slot is already booked');
      }
      
      // 3. Create the booking
      return await tx.booking.create({
        data: {
          userId,
          serviceId: bookingData.serviceId,
          providerId: bookingData.providerId,
          date: bookingData.date,
          status: 'pending',
        },
      });
    });
  }
  
  async findUserBookings(userId: number): Promise<Booking[]> {
    return prisma.booking.findMany({
      where: { userId },
      include: {
        service: true,
        provider: true,
      },
      orderBy: {
        date: 'desc',
      },
    });
  }
}