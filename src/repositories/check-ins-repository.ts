import { CheckIn, Prisma } from "@prisma/client";

export interface CheckInsRepository {
  findById(id: string): Promise<CheckIn | null>;
  findManyByUserId(userId: string, page: number): Promise<CheckIn[]>;
  findByUserInOnDate(userId: string, date: Date): Promise<CheckIn | null>;
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>;
  countByUserId(userID: string): Promise<number>;
  save(checkIn: CheckIn): Promise<CheckIn>;
}
