import { prisma } from "../prisma";

export const bookService = {
  getAll: () => {
    return prisma.book.findMany();
  },
};
