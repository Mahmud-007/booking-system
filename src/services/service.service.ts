import { PrismaClient, Service } from '@prisma/client';

const prisma = new PrismaClient();

export class ServiceService {
  async createService(data: {
    name: string;
    description: string;
    price: number;
    duration: number;
    category: string;
  }) {
    return await prisma.service.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        duration: data.duration,
        category: data.category,
      },
    });
  }
  
  async findAll(category?: string): Promise<Service[]> {
    return prisma.service.findMany({
      where: category ? { category } : undefined,
      include: {
        providers: true,
      },
    });
  }

  async findById(id: number): Promise<Service | null> {
    return prisma.service.findUnique({
      where: { id },
      include: {
        providers: true,
      },
    });
  }
}