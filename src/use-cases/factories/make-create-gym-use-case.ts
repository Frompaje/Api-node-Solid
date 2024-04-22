import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";
import { CreateGymUseCase } from "../create-gym";

export function makeCreateGymUseCase() {
  const gymsRepository = new PrismaCheckInsRepository();
  const UseCase = new CreateGymUseCase(gymsRepository);
  return UseCase;
}
