import { Like } from "@prisma/client";
import prisma from "../services/prisma-service";

class LikeController {
  async create(like: Like) {
    return await prisma.like.create({
      data: like,
    });
  }

  async findByPostIdAndUserId(postId: number, userId: number) {
    return await prisma.like.findMany({
      where: {
        postId,
        userId
      }
    })
  }

  async fetchByPostId(postId: number) {
    return await prisma.like.findMany({
      where: {
        postId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            surname: true,
          },
        },
      },
    });
  }
}

export default new LikeController();
