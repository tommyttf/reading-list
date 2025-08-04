"use client";

import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Input,
  Modal,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { RefObject } from "react";
import { GridApiCommunity } from "@mui/x-data-grid/internals";

import { trpc } from "@/trpc/client";
import type { Book } from "@prisma/client";

const defaultValues = {
  title: "",
  author: "",
  read: false,
};

export default function AddBookModal({
  open,
  handleClose,
  dataGridapiRef,
}: {
  open: boolean;
  handleClose: () => void;
  dataGridapiRef: RefObject<GridApiCommunity | null>;
}) {
  const { handleSubmit, reset, register } = useForm({
    defaultValues,
  });

  const onClose = () => {
    handleClose();
    reset(defaultValues);
  };

  const addBook = trpc.book.add.useMutation({
    onSuccess: (data) => {
      // add the record without refetching all the data
      dataGridapiRef.current?.updateRows([data]);
    },
  });
  const onSubmit = (data: Omit<Book, "id">) => {
    addBook.mutate(data);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 350,
          bgcolor: "background.paper",
          border: "2px #000",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography sx={{ textAlign: "center" }} variant="h6" component="h2">
          Add a new book record
        </Typography>

        <form
          style={{
            display: "flex",
            flexDirection: "column",
            margin: "0 auto",
            width: "250px",
          }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormGroup
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              alignItems: "center",
            }}
          >
            <Input
              type="text"
              placeholder="Title"
              required
              {...register("title")}
            />
            <Input
              type="text"
              placeholder="Author"
              required
              {...register("author")}
            />
            <FormControlLabel
              control={<Checkbox {...register("read")} />}
              label="Read?"
            />
          </FormGroup>

          <ButtonGroup sx={{ margin: "auto" }}>
            <Button type="submit">Add</Button>
            <Button onClick={() => reset(defaultValues)}>Reset</Button>
          </ButtonGroup>
        </form>
      </Box>
    </Modal>
  );
}
