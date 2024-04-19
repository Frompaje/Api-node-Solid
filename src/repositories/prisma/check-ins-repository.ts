import { CheckIn, Prisma } from "@prisma/client";

export interface CheckInsRepository {
  findManyByUserId(userId: string, page: number): Promise<CheckIn[]>;
  findByUserInOnDate(userId: string, date: Date): Promise<CheckIn | null>;
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>;
}
