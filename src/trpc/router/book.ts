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
});
