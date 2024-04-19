import { Gym, Prisma } from "@prisma/client";

export interface FindManynearbyParams {
  latitude: number;
  longitude: number;
}

export interface GymsRepository {
  create(data: Prisma.GymCreateInput): Promise<Gym>;

  searchMany(query: string, page: number): Promise<Gym[]>;

  findById(id: string): Promise<Gym | null>;

  findManyNearby(params: FindManynearbyParams): Promise<Gym[]>;
}
