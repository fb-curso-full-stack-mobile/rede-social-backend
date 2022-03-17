import { Post, PrismaClient } from "@prisma/client";

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
}

export default new PostController();
