import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Box, CircularProgress, Typography, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { OrderModal } from "./order-modal"; // Импортируйте новый компонент
import { DeleteModal } from "./delete-modal"; // Импортируйте новый компонент
import { useTableListQuery } from "../service/table.service";

const paginationModel = { page: 0, pageSize: 5 };

export const DataTable = () => {
  const { data, isLoading, isError, error } = useTableListQuery();

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "title", headerName: "Title", flex: 1 },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      flex: 1,
      align: "left",
      headerAlign: "left",
    },
    { field: "category", headerName: "Category", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <>
          <Button onClick={() => handleEdit(params.row)} color="primary">
            <EditIcon />
          </Button>
          <Button
            onClick={() => handleDeleteOpen(params.row)}
            color="secondary"
          >
            <DeleteIcon />
          </Button>
        </>
      ),
    },
  ];

  const [editModalOpen, setEditModalOpen] = React.useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
  const [currentRow, setCurrentRow] = React.useState(null);

  const handleEdit = (row) => {
    setCurrentRow(row);
    setEditModalOpen(true);
  };

  const handleCreate = () => {
    setCurrentRow(null); // Clear current row for new entry
    setEditModalOpen(true);
  };

  const handleDeleteOpen = (row) => {
    setCurrentRow(row);
    setDeleteModalOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteModalOpen(false);
  };

  const handleEditClose = () => {
    setEditModalOpen(false);
  };

  const onEditSubmit = (data) => {
    if (currentRow) {
      console.log("Edited Data: ", data);
      // Handle your edit logic here
    } else {
      console.log("Created New Data: ", data);
      // Handle your create logic here
    }
    setEditModalOpen(false);
  };

  if (isLoading)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="50vh"
      >
        <CircularProgress />
      </Box>
    );

  if (isError)
    return <Typography color="error">Error: {error.message}</Typography>;

  const rows =
    data?.data.map((item) => ({
      id: item.id,
      title: item.title,
      price: item.price,
      category: item.category,
    })) || [];

  return (
    <Paper sx={{ height: 400, width: "100%", padding: "0" }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        padding={2}
      >
        <Typography variant="h6">Data Table</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreate}
          startIcon={<AddIcon />}
        >
          Create
        </Button>
      </Box>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        sx={{ border: 0 }}
      />

      {/* Edit Modal */}
      <OrderModal
        open={editModalOpen}
        onClose={handleEditClose}
        onSubmit={onEditSubmit}
        initialData={currentRow || { title: "", price: 0, category: "" }}
      />

      {/* Delete Confirmation Modal */}
      <DeleteModal
        open={deleteModalOpen}
        onClose={handleDeleteClose}
        onDelete={() => {
          console.log("Deleted Item ID: ", currentRow.id);
          handleDeleteClose();
        }}
      />
    </Paper>
  );
};
