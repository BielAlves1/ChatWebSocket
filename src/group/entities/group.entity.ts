import { Prisma } from '@prisma/client';

export class Group implements Prisma.GroupUncheckedCreateInput {
  id?: number;
  name?: string;
  isPrivate?: boolean;
  messages?: Prisma.MessageUncheckedCreateNestedManyWithoutGroupInput;
  groupUsers?: Prisma.GroupUserUncheckedCreateNestedManyWithoutGroupInput;
}
