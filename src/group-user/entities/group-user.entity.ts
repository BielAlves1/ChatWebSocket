import { Prisma } from "@prisma/client";

export class GroupUser implements Prisma.GroupUserUncheckedCreateInput{
    id?: number;
    userId: number;
    groupId: number;
}
