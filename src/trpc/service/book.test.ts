import { Prisma } from "@prisma/client";
import { describe, expect, test, vi } from "vitest"; // 👈🏻 Added the `vi` import

import { bookService } from "./book";
import { prisma } from "../__mocks__/prisma";

vi.mock("../prisma");

describe("book service", () => {
  describe("toggleRead", () => {
    test("should toggle book read when id exists", async () => {
      // Arrange
      const mock1 = prisma.book.findUniqueOrThrow.mockResolvedValue({
        id: 1,
        title: "test",
        author: "test",
        read: false,
      });
      const mock2 = prisma.book.update.mockResolvedValue({
        id: 1,
        title: "test",
        author: "test",
        read: true,
      });

      // Act
      const book = await bookService.toggleRead(1);

      // Assert
      expect(mock1).toHaveBeenCalledExactlyOnceWith({
        where: {
          id: 1,
        },
        select: {
          read: true,
        },
      });
      expect(mock2).toHaveBeenCalledExactlyOnceWith({
        where: {
          id: 1,
        },
        data: {
          read: true,
        },
      });
      expect(book).toEqual({
        id: 1,
        title: "test",
        author: "test",
        read: true,
      });
    });
    
    test("should throw error when id does not exist", async () => {
      // Arrange
      prisma.book.findUniqueOrThrow.mockRejectedValue(
        new Prisma.PrismaClientKnownRequestError("Entity not found", {
          code: "P2025",
          clientVersion: "",
        })
      );
      
      // Act & Assert
      await expect(bookService.toggleRead(1)).rejects.toThrowError(
        "Book not found for id: 1"
      );
    });
  });
});
