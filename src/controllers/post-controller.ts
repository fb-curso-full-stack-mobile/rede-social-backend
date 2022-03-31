import { Post, PrismaClient } from "@prisma/client";
import prisma from "../services/prisma-service";
import friendController from "./friend-controller";
import likeController from "./like-controller";

class PostController {
  async create(post: Post) {
    return prisma.post.create({
      data: post,
    });
  }

  async find(id: number) {
    const post = await prisma.post.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
        comments: true,
      },
    });
    (post as any).likes = await likeController.fetchByPostId(id);
    return post;
  }

  async fetchAll(userId: number) {
    const friends = await friendController.findFriends(userId);
    const ids = friends.map((friend) =>
      friend.userAId === userId ? friend.userBId : friend.userAId
    );
    ids.push(userId);
    const posts = await prisma.post.findMany({
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
    for (const post of posts) {
      (post as any).likes = await likeController.fetchByPostId(post.id);
    }
    return posts;
  }
}

export default new PostController();
