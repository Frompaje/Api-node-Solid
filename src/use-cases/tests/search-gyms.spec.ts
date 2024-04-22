import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gym-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { SearchGymUseCase } from "../search-gyms";

let gymsRepository: InMemoryGymsRepository;
let sut: SearchGymUseCase;

describe("Search Gyms Use Case", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new SearchGymUseCase(gymsRepository);
  });

  it("should be able to search for gyms", async () => {
    await gymsRepository.create({
      title: "Javascript GYms",
      description: " ",
      phone: "",
      latitude: -3.0618426,
      longitude: -60.0672237,
    });

    await gymsRepository.create({
      title: "Typescript Gyms",
      description: " ",
      phone: "",
      latitude: -3.0618426,
      longitude: -60.0672237,
    });

    const { gyms } = await sut.execute({
      query: "Javascript",
      page: 1,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "Javascript GYms" }),
    ]);
  });

  it("should be able to fetch paginated gym search", async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Javascript Gyms ${i}`,
        description: " ",
        phone: "",
        latitude: -3.0618426,
        longitude: -60.0672237,
      });
    }

    const { gyms } = await sut.execute({
      query: "Javascript",
      page: 2,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: `Javascript Gyms 21` }),
      expect.objectContaining({ title: `Javascript Gyms 22` }),
    ]);
  });
});
