import { ResourceNotFoundError } from "@/error/resource-not-found-error";
import { InMemoryUsersRepository } from "@/repositories/prisma/in-memory/in-memory-users-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { GetUserProfileUseCase } from "./factories/get-user-profile";
import { hash } from "bcryptjs";

let usersRepository: InMemoryUsersRepository;
let sut: GetUserProfileUseCase;

describe("Get User Profile Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new GetUserProfileUseCase(usersRepository);
  });

  it("should be able to get user profile", async () => {
    const createdUser = await usersRepository.create({
      name: "John Doe",
      email: "okdas@gmail.com",
      password_hash: await hash("481523321", 6),
    });

    const { user } = await sut.execute({
      userId: createdUser.id,
    });

    expect(user.name).toEqual("John Doe");
  });

  it("should be able to get user profile", async () => {
    await expect(() =>
      sut.execute({
        userId: "Non-existing-id",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
