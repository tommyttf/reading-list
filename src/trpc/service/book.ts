import { Prisma } from "@prisma/client";
import { prisma } from "../prisma";

export const bookService = {
  getAll: () => {
    return prisma.book.findMany();
  },
  toggleRead: async (id: number) => {
    try {
      const book = await prisma.book.findUniqueOrThrow({
        where: {
          id,
        },
        select: {
          read: true,
        },
      });
      return prisma.book.update({
        where: {
          id,
        },
        data: {
          read: !book.read,
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        throw new Error(`Book not found for id: ${id}`);
      }
      throw error;
    }
  },
};
