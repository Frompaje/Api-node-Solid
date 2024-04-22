import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";
import { GetUserMetricsUseCase } from "../get-user-metrics";
import { SearchGymUseCase } from "../search-gyms";

export function makeSearchGymsUseCase() {
  const gymsRepository = new PrismaCheckInsRepository();
  const UseCase = new SearchGymUseCase(gymsRepository);
  return UseCase;
}
