import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Checkbox } from "@mui/material";
import { useMemo } from "react";

import type { Book } from "@prisma/client";

import { trpc } from "@/trpc/client";

export default function Book() {
  const books = trpc.book.getAll.useQuery();

  const columns = useMemo<GridColDef<Book>[]>(
    () => [
      {
        field: "title",
        headerName: "Title",
        flex: 5,
        align: "center",
        headerAlign: "center",
      },
      {
        field: "author",
        headerName: "Author",
        flex: 4,
        align: "center",
        headerAlign: "center",
      },
      {
        field: "read",
        headerName: "Read?",
        flex: 2,
        align: "center",
        headerAlign: "center",
        renderCell: ({ row: { read } }) => (
          <Checkbox
            checked={read}
            onChange={() => {
              // TODO: implement toggle read
            }}
          />
        ),
      },
    ],
    []
  );

  return (
    <Box sx={{ width: "100%" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column"
        }}
      >
        <DataGrid
          loading={books.isLoading}
          rows={books.data ?? []}
          pageSizeOptions={[10, 15, 20, 100]}
          columns={columns}
          getRowId={({ id }) => id}
        />
      </div>
    </Box>
  );
}
