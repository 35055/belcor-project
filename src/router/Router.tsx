import { Route, Routes } from "react-router-dom";
import { Layout } from "../components/layout";
import { DataTable } from "../components/table";
import { Login } from "../components/login";
import { useAuthStore } from "../store/AuthStore";

export const Router = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <Routes>
      {isAuthenticated ? (
        <Route path="/" element={<Layout />}>
          <Route index element={<DataTable />} />
          {/* Другие маршруты */}
        </Route>
      ) : (
        <Route path="/" element={<Login />} />
      )}
    </Routes>
  );
};
