import { PrismaClient, User } from "@prisma/client";

import bcrypt from "bcrypt";
import prisma from "../services/prisma-service";

class UserController {
  async create(user: User) {
    const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS || 10);
    const hash = bcrypt.hashSync(user.password, saltRounds);
    user.password = hash;
    return await prisma.user.create({
      data: user,
    });
  }

  async getUserByEmail(email: string) {
    return await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  async find(id: number) {
    return await prisma.user.findUnique({
      where: {
        id,
      },
    });
  }
}

export default new UserController();
