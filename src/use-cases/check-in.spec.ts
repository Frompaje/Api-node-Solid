import { InMemoryCheckInsRepository } from "@/repositories/prisma/in-memory/in-memory-check-ins-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CheckInUseCase } from "./checkin";

let usersRepository: InMemoryCheckInsRepository;
let sut: CheckInUseCase;

describe("Register Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryCheckInsRepository();
    sut = new CheckInUseCase(usersRepository);
  });

  it.skip("should be able to check in", async () => {
    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "",
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
});
