import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { bookService } from "@/trpc/service/book";

export const bookRouter = createTRPCRouter({
  getAll: baseProcedure.query(() => {
    return bookService.getAll();
  }),
});
