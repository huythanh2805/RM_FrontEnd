import FoodOrder from "@/components/Admin/FoodOrder/FoodOrder";
import CreateReservation from "@/components/Admin/Reservation/CreateReservation";
import TableManagement from "@/components/Admin/TableManagement";
import ProductDetail from "@/components/layouts/ProductDetail";
import { LoginPage } from "@/pages/auth/LoginPage";
import { ForgotPasswordPage } from "@/pages/auth/PasswordPage";
import { RegisterPage } from "@/pages/auth/Register";
import { ResetPasswordPage } from "@/pages/auth/ResetPasswordPage";
import Categories from "@/pages/dashboard/Categories";
import Dashboard from "@/pages/dashboard/Dashboard";
import { ProfileAdmin } from "@/pages/dashboard/Profile";
import About from "@/pages/home/About";
import Home from "@/pages/home/Home";
import HomeLayout from "@/pages/home/HomeLayout";
import Menu from "@/pages/home/Menu";
import NotFound from "@/pages/home/NotFound";
import { Profile } from "@/pages/home/Profile";
import Reservation from "@/pages/home/Reservation";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "menu",
        element: <Menu />,
      },
      {
        path: "reservation",
        element: <Reservation />,
      },
      {
        path: "dishes/:id",
        element: <ProductDetail />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
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
        path: "proAdmin",
        element: <ProfileAdmin />,
      },
      {
        path: "tables",
        element: <TableManagement />,
      },
      {
        path: "createReservation/:tableId",
        element: <CreateReservation />,
      },
      {
        path: "foodOrder/:reservationId",
        element: <FoodOrder />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
