import { Prisma } from '@prisma/client';

export class Message implements Prisma.MessageUncheckedCreateInput {
  id?: number;
  content: string;
  createdAt?: string | Date;
  senderId: number;
  groupId: number;
}
