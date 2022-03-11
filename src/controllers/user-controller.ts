import { PrismaClient, User } from "@prisma/client";

import bcrypt from "bcrypt";

class UserController {
  async create(user: User) {
    const prisma = new PrismaClient();
    try {
      const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS || 10);
      const hash = bcrypt.hashSync(user.password, saltRounds);
      user.password = hash;
      return await prisma.user.create({
        data: user,
      });
    } catch (e) {
      throw e;
    } finally {
      prisma.$disconnect();
    }
  }

  async getUserByEmail(email: string) {
    const prisma = new PrismaClient();
    try {
      return await prisma.user.findUnique({
        where: {
          email: email,
        },
      });
    } catch (e) {
      throw e;
    } finally {
      prisma.$disconnect();
    }
  }
}

export default new UserController();
