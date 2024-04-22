import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gym-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { FetchNearbyGymsUseCase } from "../fetch-nearby-gyms";

let gymsRepository: InMemoryGymsRepository;
let sut: FetchNearbyGymsUseCase;

describe("Fetch Nearby Gyms Use Case", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new FetchNearbyGymsUseCase(gymsRepository);
  });

  it("should be able to search for gyms", async () => {
    await gymsRepository.create({
      title: "near GYms",
      description: " ",
      phone: "",
      latitude: -3.0618426,
      longitude: -60.0672237,
    });

    await gymsRepository.create({
      title: "far Gyms",
      description: " ",
      phone: "",
      latitude: -33.0618426,
      longitude: -120.0672237,
    });

    const { gyms } = await sut.execute({
      userLatitude: -3.0618426,
      userLongitude: -60.0672237,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: "near GYms" })]);
  });
});
