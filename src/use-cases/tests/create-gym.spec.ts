import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gym-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateGymUseCase } from "../create-gym";

let gymsRepository: InMemoryGymsRepository;
let sut: CreateGymUseCase;

describe("Create Gym Use Case", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new CreateGymUseCase(gymsRepository);
  });

  it("should be able to create gym", async () => {
    const { gym } = await sut.execute({
      title: "Javascript GYM",
      description: null,
      phone: null,
      latitude: -3.0618426,
      longitude: -60.0672237,
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
