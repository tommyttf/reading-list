import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
async function main() {
  await prisma.book.create({
    data: {
      title: "Harry Potter 1",
      author: "J.K. Rowling",
      read: true,
    },
  });
  await prisma.book.create({
    data: {
      title: "Harry Potter 2",
      author: "J.K. Rowling",
      read: true,
    },
  });
  await prisma.book.create({
    data: {
      title: "Harry Potter 3",
      author: "J.K. Rowling",
      read: true,
    },
  });
  await prisma.book.create({
    data: {
      title: "Harry Potter 4",
      author: "J.K. Rowling",
      read: false,
    },
  });
  await prisma.book.create({
    data: {
      title: "Harry Potter 5",
      author: "J.K. Rowling",
      read: false,
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
