import { LoginPage } from "@/pages/auth/LoginPage";
import { ForgotPasswordPage } from "@/pages/auth/PasswordPage";
import { RegisterPage } from "@/pages/auth/Register";
import { ResetPasswordPage } from "@/pages/auth/ResetPasswordPage";
import Dashboard from "@/pages/dashboard/Dashboard";
import About from "@/pages/home/About";
import Home from "@/pages/home/Home";
import HomeLayout from "@/pages/home/HomeLayout";
import Reservation from "@/pages/home/Reservation";
import { createBrowserRouter } from "react-router-dom";
import TableComponent from "@/components/Admin/table/TableComponent";
import TableManagement from "@/components/Admin/TableManagement";
import CreateReservation from "@/components/Admin/Reservation/CreateReservation";
import FoodOrder from "@/components/Admin/FoodOrder/FoodOrder";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    // loader: rootLoader,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
        // loader: teamLoader,
      },
      {
        path: "reservation",
        element: <Reservation />,
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
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
  },
  {
    path: "/reset-password/:token",
    element: <ResetPasswordPage />,
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
        path: "reservations/createReservation/:tableId",
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
