import { Post, PrismaClient } from "@prisma/client";
import friendController from "./friend-controller";

class PostController {
  async create(post: Post) {
    const prisma = new PrismaClient();
    try {
      return prisma.post.create({
        data: post,
      });
    } catch (e) {
      throw e;
    } finally {
      prisma.$disconnect();
    }
  }

  async fetchAll(userId: number) {
    const prisma = new PrismaClient();
    try {
      const friends = await friendController.findFriends(userId);
      const ids = friends.map((friend) =>
        friend.userAId === userId ? friend.userBId : friend.userAId
      );
      ids.push(userId);
      return await prisma.post.findMany({
        where: {
          userId: {
            in: ids,
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

export default new PostController();
