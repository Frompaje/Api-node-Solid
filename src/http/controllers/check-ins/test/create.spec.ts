import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import { createAndAuthenticateUser } from "@/use-cases/utils/create-and-authenticate-user";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Create Check-in (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it("Should be able to create a check-in", async () => {
    const { token } = await createAndAuthenticateUser(app);

    const gym = await prisma.gym.create({
      data: {
        title: "Javascript",
        latitude: 27.0618426,
        longitude: 49.0672237,
      },
    });

    const response = await request(app.server)
      .post("/gyms/")
      .set("Authorization", `Bearer ${token}`)
      .send({
        latitude: 27.0618426,
        longitude: 49.0672237,
      });

    expect(response.statusCode).toEqual(201);
  });
});
