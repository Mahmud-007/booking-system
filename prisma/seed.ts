import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Clean existing data
  await prisma.booking.deleteMany();
  await prisma.user.deleteMany();
  await prisma.service.deleteMany();
  await prisma.provider.deleteMany();

  // Create users
  const user1 = await prisma.user.create({
    data: {
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      password: await bcrypt.hash('password123', 10),
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'Michael Chen',
      email: 'michael@example.com',
      password: await bcrypt.hash('password123', 10),
    },
  });

  // Create services
  const service1 = await prisma.service.create({
    data: {
      name: 'Swedish Massage',
      description: 'A relaxing full-body massage using long strokes',
      price: 85.0,
      duration: 60,
      category: 'Massage',
    },
  });

  const service2 = await prisma.service.create({
    data: {
      name: 'Deep Tissue Massage',
      description: 'Focused massage targeting deeper muscle layers',
      price: 95.0,
      duration: 60,
      category: 'Massage',
    },
  });

  const service3 = await prisma.service.create({
    data: {
      name: 'Facial Treatment',
      description: 'Cleansing, exfoliation, and hydrating face treatment',
      price: 75.0,
      duration: 45,
      category: 'Skincare',
    },
  });

  // Create providers
  const provider1 = await prisma.provider.create({
    data: {
      name: 'Maria Lopez',
      email: 'maria@mobilespa.com',
      phone: '555-123-4567',
      bio: 'Licensed massage therapist specializing in Swedish and Deep Tissue massage',
    },
  });

  const provider2 = await prisma.provider.create({
    data: {
      name: 'James Wilson',
      email: 'james@mobilespa.com',
      phone: '555-987-6543',
      bio: 'Licensed massage therapist and esthetician',
    },
  });

  const provider3 = await prisma.provider.create({
    data: {
      name: 'Aisha Patel',
      email: 'aisha@mobilespa.com',
      phone: '555-456-7890',
      bio: 'Licensed esthetician specializing in facial treatments',
    },
  });

  // Connect providers with services
  await prisma.provider.update({
    where: { id: provider1.id },
    data: {
      services: {
        connect: [{ id: service1.id }, { id: service2.id }],
      },
    },
  });

  await prisma.provider.update({
    where: { id: provider2.id },
    data: {
      services: {
        connect: [{ id: service1.id }, { id: service2.id }, { id: service3.id }],
      },
    },
  });

  await prisma.provider.update({
    where: { id: provider3.id },
    data: {
      services: {
        connect: [{ id: service3.id }],
      },
    },
  });

  // Create a sample booking
  await prisma.booking.create({
    data: {
      userId: user1.id,
      serviceId: service1.id,
      providerId: provider1.id,
      date: new Date('2025-04-29T14:00:00Z'),
      status: 'confirmed',
    },
  });

  console.log('Database has been seeded with sample data');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });