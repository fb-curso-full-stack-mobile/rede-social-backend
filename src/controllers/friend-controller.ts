import { PrismaClient } from "@prisma/client";
import debug from "debug";
import prisma from "../services/prisma-service";

const log = debug("app:controller:friend");

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
        userAId: {
          in: [userId, friendId],
        },
        userBId: {
          in: [userId, friendId],
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
