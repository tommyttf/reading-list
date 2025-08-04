import { createCallerFactory, createTRPCRouter } from '../init';
import { bookRouter } from './book';

export const appRouter = createTRPCRouter({
    book: bookRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
