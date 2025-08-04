import { trpc } from "@/trpc/client";

export default function Book() {
    
  const books = trpc.book.getAll.useQuery();
  console.log(books);

  return (
    <div>
        {
            books.data?.map((book) => (
                <div key={book.id}>
                    <h1>{book.title}</h1>
                    <p>{book.author}</p>
                </div>
            ))
        }
    </div>
  );
}
