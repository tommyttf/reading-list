import { z } from "zod";

import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { bookService } from "@/trpc/service/book";

export const bookRouter = createTRPCRouter({
  getAll: baseProcedure.query(() => {
    return bookService.getAll();
  }),
  toggleRead: baseProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(({ input: { id } }) => {
      return bookService.toggleRead(id);
    }),
    add: baseProcedure
      .input(
        z.object({
          title: z.string(),
          author: z.string(),
          read: z.boolean(),
        })
      )
      .mutation(({ input: { title, author, read } }) => {
        if (!title || !author) {
          throw new Error("Invalid data");
        }
        return bookService.add({
          title,
          author,
          read,
        });
      }),
});
