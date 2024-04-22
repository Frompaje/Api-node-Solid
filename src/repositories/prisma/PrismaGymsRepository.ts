import { Prisma } from "@prisma/client";
import { FindManynearbyParams, GymsRepository } from "../gyms-repository";
import { prisma } from "@/lib/prisma";

export class PrismaGymsRepository implements GymsRepository {
  async create(data: Prisma.GymCreateInput) {
    const gym = await prisma.gym.create({
      data,
    });
    return gym;
  }

  async searchMany(query: string, page: number) {
    const gyms = await prisma.gym.findMany({
      where: {
        title: { contains: query },
      },
      take: 20,
      skip: (page - 1) * 20,
    });
    return gyms;
  }

  async findById(id: string) {
    const gym = await prisma.gym.findUnique({
      where: {
        id,
      },
    });
    return gym;
  }
  async findManyNearby(params: FindManynearbyParams) {
    const gyms = await prisma.$queryRaw`
    SELECT * from gyms 
    
    `;
  }
}
