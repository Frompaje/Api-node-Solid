import { app } from "@/app";
import { createAndAuthenticateUser } from "@/use-cases/utils/create-and-authenticate-user";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Search Gyms (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it("Should be able to search a gym", async () => {
    const { token } = await createAndAuthenticateUser(app, true);

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Javascript Gym",
        description: null,
        phone: null,
        latitude: 27.0618426,
        longitude: 49.0672237,
      });

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "typescript Gym",
        description: null,
        phone: null,
        latitude: 27.0618426,
        longitude: 49.0672237,
      });

    const response = await request(app.server)
      .get("/gyms/search")
      .query({
        query: "Javascript",
      })
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.gym).toHaveLength(1);
    expect(response.body.gym).toEqual([
      expect.objectContaining({
        title: "Javascript Gym",
      }),
    ]);
  });
});
