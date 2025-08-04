import { DataGrid, GridColDef, useGridApiRef } from "@mui/x-data-grid";
import { Box, Checkbox, Stack, Button } from "@mui/material";
import { useMemo, useState } from "react";

import type { Book } from "@prisma/client";

import { trpc } from "@/trpc/client";
import AddBookModal from "./addBookModal";

export default function Book() {
  const apiRef = useGridApiRef();

  const books = trpc.book.getAll.useQuery();
  const toggleBookRead = trpc.book.toggleRead.useMutation({
    onSuccess: (data) => {
      // update the row without refetching all the data
      apiRef.current?.updateRows([data]);
    },
  });

  const [open, setOpen] = useState(false);

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
        renderCell: ({ row: { id, read } }) => (
          <Checkbox
            checked={read}
            onChange={() => {
              toggleBookRead.mutate({ id });
            }}
          />
        ),
      },
    ],
    [toggleBookRead]
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
        <Button size="small" onClick={() => setOpen(true)}>
          Add book
        </Button>
      </Stack>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {books.isFetched && (
          <DataGrid
            apiRef={apiRef}
            loading={books.isLoading}
            rows={books.data ?? []}
            pageSizeOptions={[10, 15, 20, 100]}
            columns={columns}
            getRowId={({ id }) => id}
            disableRowSelectionOnClick
          />
        )}
      </div>
      <AddBookModal
        open={open}
        handleClose={() => setOpen(false)}
        dataGridapiRef={apiRef}
      />
    </Box>
  );
}
