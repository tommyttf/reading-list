import { afterEach, afterAll, describe, expect, test } from "vitest";
import { prisma } from "../prisma";
import { createCaller } from "./_app";

describe("book router", () => {
  const caller = createCaller({});

  afterEach(async () => {
    await prisma.book.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  test("add and get all books", async () => {
    const addedBook = await caller.book.add({
      title: "test1",
      author: "test1",
      read: false,
    });
    const books = await caller.book.getAll();

    expect(books).toEqual([addedBook]);
  });

  test("add and toggle read", async () => {
    const addedBook = await caller.book.add({
      title: "test2",
      author: "test2",
      read: false,
    });
    await caller.book.toggleRead({ id: addedBook.id });
    const books = await caller.book.getAll();

    expect(books).toEqual([
      {
        ...addedBook,
        read: true,
      },
    ]);
  });
});
