import ProductDetail from "@/components/layouts/ProductDetail";
import { LoginPage } from "@/pages/auth/LoginPage";
import { ForgotPasswordPage } from "@/pages/auth/PasswordPage";
import { RegisterPage } from "@/pages/auth/Register";
import { ResetPasswordPage } from "@/pages/auth/ResetPasswordPage";
import Dashboard from "@/pages/dashboard/Dashboard";
import About from "@/pages/home/About";
import Home from "@/pages/home/Home";
import HomeLayout from "@/pages/home/HomeLayout";
import { Profile } from "@/pages/home/Profile";
import Reservation from "@/pages/home/Reservation";
import { createBrowserRouter } from "react-router-dom";
import TableManagement from "@/components/Admin/TableManagement";
import CreateReservation from "@/components/Admin/Reservation/CreateReservation";
import FoodOrder from "@/components/Admin/FoodOrder/FoodOrder";
import Menu from "@/pages/home/Menu";
import Categories from "@/pages/dashboard/Categories";

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
        path: "menu",
        element: <Menu />,
        // loader: teamLoader,
      },
      {
        path: "reservation",
        element: <Reservation />,
        // loader: teamLoader,
      },
      {
        path: "dishes/:id",
        element: <ProductDetail />,
      },
      {
        path: "profile",
        element: <Profile />,
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
        path: "categories",
        element: <Categories />,
      },
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
