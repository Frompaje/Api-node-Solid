import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";
import { FetchNearbyGymsUseCase } from "../fetch-nearby-gyms";

export function makeFetchNearbyGymsUseCase() {
  const gymsRepository = new PrismaCheckInsRepository();
  const UseCase = new FetchNearbyGymsUseCase(gymsRepository);
  return UseCase;
}
