import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";

interface EditModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { title: string; price: number; category: string }) => void;
  initialData: { title: string; price: number; category: string };
}

export const OrderModal: React.FC<EditModalProps> = ({
  open,
  onClose,
  onSubmit,
  initialData,
}) => {
  const { register, handleSubmit, reset } = useForm();

  React.useEffect(() => {
    reset(initialData);
  }, [initialData, reset]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {initialData.title ? "Edit Order" : "Add Order"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>Edit the details of the item.</DialogContentText>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "30px",
            width: "500px",
            maxWidth: "100%",
          }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField {...register("title")} label="Title" fullWidth />
          <TextField
            {...register("price")}
            label="Price"
            type="number"
            fullWidth
          />
          <TextField {...register("category")} label="Category" fullWidth />
          <DialogActions>
            <Button onClick={onClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Save
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};
