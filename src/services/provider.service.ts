import { PrismaClient, Provider } from "@prisma/client";

const prisma = new PrismaClient();

export class ProviderService {
  async createProvider(data: {
    name: string;
    email: string;
    phone?: string;
    bio?: string;
    serviceIds?: number[]; // optional: link services during creation
  }) {
    return await prisma.provider.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        bio: data.bio,
        services: data.serviceIds
          ? {
              connect: data.serviceIds.map((id) => ({ id })),
            }
          : undefined,
      },
    });
  }

  async findAll(serviceId?: number): Promise<Provider[]> {
    return prisma.provider.findMany({
      where: serviceId ? { services: { some: { id: serviceId } } } : undefined,
      include: {
        services: true,
      },
    });
  }

  async findById(id: number): Promise<Provider | null> {
    return prisma.provider.findUnique({
      where: { id },
      include: {
        services: true,
      },
    });
  }
}
