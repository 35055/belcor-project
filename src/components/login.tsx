import React, { useState } from "react";
import { Box, TextField, Button, Snackbar, Alert } from "@mui/material";
import { useForm } from "react-hook-form";
import { useAuthStore } from "../store/AuthStore";

export const Login = () => {
  const { register, handleSubmit } = useForm();
  const login = useAuthStore((state) => state.login);

  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const onSubmit = async (data: { name: string; password: string }) => {
    setLoading(true);

    // Задержка в 3 секунды перед проверкой
    setTimeout(() => {
      if (data.name === "admin@gmail.com" && data.password === "12345678") {
        login(data.name, data.password);
        setSnackbarMessage("Login successful!");
        setSnackbarSeverity("success");
      } else {
        setSnackbarMessage("Not Found!");
        setSnackbarSeverity("error");
      }
      setSnackbarOpen(true);
      setLoading(false);
    }, 2000);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box display="flex" justifyContent="center">
      <Box
        display="flex"
        width="400px"
        flexDirection="column"
        alignItems="center"
        gap="30px"
      >
        <Box
          color="#A0AEC0"
          display="flex"
          justifyContent="center"
          pt="100px"
          pb="100px"
          fontSize="50px"
        >
          BELCOR
        </Box>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "30px",
            width: "100%",
          }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            required
            label="Name"
            fullWidth
            size="small"
            {...register("name")}
          />
          <TextField
            required
            label="Password"
            type="password"
            fullWidth
            size="small"
            {...register("password")}
          />
          <Button
            type="submit"
            fullWidth
            size="large"
            variant="contained"
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
          </Button>
        </form>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000} // Установлено на 3 секунды
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }} // Позиция Snackbar
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};
