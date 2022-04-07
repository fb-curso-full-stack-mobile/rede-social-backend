import { PrismaClient } from "@prisma/client";
import prisma from "../services/prisma-service";

class FriendController {
  async findFriends(userId: number) {
    return await prisma.friend.findMany({
      where: {
        userAId: userId,
        OR: {
          userBId: userId,
          AND: {
            accepted: true,
          },
        },
      },
    });
  }

  async find(userId: number, friendId: number) {
    return await prisma.friend.findFirst({
      where: {
        userAId: userId,
        userBId: friendId,
        OR: {
          userAId: friendId,
          userBId: userId,
        },
      },
    });
  }
  async create(userId: number, friendId: number) {
    const entry = await this.find(userId, friendId);
    if (entry) {
      return entry;
    } else {
      return await prisma.friend.create({
        data: {
          userAId: userId,
          userBId: friendId,
          accepted: false,
        },
      });
    }
  }

  async accept(userId: number, friendId: number, accepted: boolean) {
    const entry = await this.find(userId, friendId);
    if (entry) {
      return prisma.friend.update({
        data: {
          accepted,
        },
        where: {
          userAId_userBId: {
            userAId: entry?.userAId || 0,
            userBId: entry?.userBId || 0,
          },
        },
      });
    }
    return undefined;
  }
}

export default new FriendController();
