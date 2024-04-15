import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export class inMemoryUsersRepository {
  public users: object[] = [];

  async create(data: Prisma.UserCreateInput) {
    this.users.push(data);
  }
}
