import fastify from "fastify";
import { PrismaClient } from "@prisma/client";

export const app = fastify();
const prisma = new PrismaClient();

// prisma.user.create({
//   data: {
//     name: "Yan Edwards",
//     email: "yan@gmail.com",

//   },
// });

app.get("/", (req, res) => {
  res.status(200).send("Hello");
});
