import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import { createAndAuthenticateUser } from "@/use-cases/utils/create-and-authenticate-user";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Check-in History (e2e)", () => {
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

    const user = await prisma.user.findFirstOrThrow();
    await prisma.checkIn.createMany({
      data: [
        { gym_id: gym.id, user_id: user.id },
        { gym_id: gym.id, user_id: user.id },
      ],
    });

    const response = await request(app.server)
      .post("/check-ins/history")
      .set("Authorization", `Bearer ${token}`)
      .send({});

    expect(response.statusCode).toEqual(200);
    expect(response.body.checkIns).toEqual([
      expect.objectContaining({
        gym_id: gym.id,
      }),
      expect.objectContaining({
        gym_id: gym.id,
      }),
    ]);
  });
});
