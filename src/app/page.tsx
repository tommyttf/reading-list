"use client";

import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";

import { trpc } from "@/trpc/client";
import Book from "./component/book";

function Home() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <Suspense fallback={<div>Loading...</div>}>
        <Book />
      </Suspense>
    </ErrorBoundary>
  );
}

export default trpc.withTRPC(Home);