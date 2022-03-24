import { Post, PrismaClient } from "@prisma/client";
import prisma from "../services/prisma-service";
import friendController from "./friend-controller";

class PostController {
  async create(post: Post) {
    return prisma.post.create({
      data: post,
    });
  }

  async find(id: number) {
    return await prisma.post.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
        comments: true,
      },
    });
  }

  async fetchAll(userId: number) {
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
      include: {
        user: true,
        comments: true,
      },
    });
  }
}

export default new PostController();
