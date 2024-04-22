import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { SearchGymUseCase } from "../search-gyms";

export function makeSearchGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository();
  const UseCase = new SearchGymUseCase(gymsRepository);
  return UseCase;
}
