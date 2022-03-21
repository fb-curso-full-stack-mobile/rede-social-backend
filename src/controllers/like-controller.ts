import { Like } from "@prisma/client";
import prisma from "../services/prisma-service";

class LikeController {
  async create(like: Like) {
    return await prisma.like.create({
      data: like,
    });
  }
}

export default new LikeController();
