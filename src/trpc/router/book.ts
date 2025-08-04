import { baseProcedure, createTRPCRouter } from "@/trpc/init";

// TODO: use data from database
const books = [
  {
    id: 1,
    title: "Book 1",
    author: "Author 1",
  },
  {
    id: 2,
    title: "Book 2",
    author: "Author 2",
  },
  {
    id: 3,
    title: "Book 3",
    author: "Author 3",
  },
];

export const bookRouter = createTRPCRouter({
  getAll: baseProcedure.query(() => {
    return books;
  }),
});
