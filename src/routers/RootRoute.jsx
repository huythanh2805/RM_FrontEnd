import Dashboard from "@/pages/dashboard/Dashboard";
import { LoginPage } from "@/pages/auth/LoginPage";
import { RegisterPage } from "@/pages/auth/Register";
import About from "@/pages/home/About";
import Home from "@/pages/home/Home";
import { createBrowserRouter } from "react-router-dom";
import TableComponent from "@/components/Admin/table/TableComponent";
import TableManagement from "@/components/Admin/TableManagement";
import CreateReservation from "@/components/Admin/Reservation/CreateReservation";
import FoodOrder from "@/components/Admin/FoodOrder/FoodOrder";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    // loader: rootLoader,
    children: [
      {
        path: "about",
        element: <About />,
        // loader: teamLoader,
      },
    ],
  },
  {
    path: "/register",
    element: <RegisterPage />,
    // loader: rootLoader,
  },
  {
    path: "/login",
    element: <LoginPage />,
    // loader: rootLoader,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "tables",
        element: <TableManagement />,
        // loader: teamLoader,
      },
      {
        path: "createReservation/:tableId",
        element: <CreateReservation />,
        // loader: teamLoader,
      },
      {
        path: "foodOrder/:reservationId",
        element: <FoodOrder />,
        // loader: teamLoader,
      },
    ],
  },
]);

export default router;
