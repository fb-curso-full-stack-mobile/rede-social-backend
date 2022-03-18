import { PrismaClient } from "@prisma/client";

class FriendController {
  async findFriends(userId: number) {
    const prisma = new PrismaClient();
    try {
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
    } catch (e) {
      throw e;
    } finally {
      prisma.$disconnect();
    }
  }
}

export default new FriendController();
