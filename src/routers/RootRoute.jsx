import CompletedBill from "@/components/Admin/Bill/CompletedBill";
import FoodOrder from "@/components/Admin/FoodOrder/FoodOrder";
import CreateReservation from "@/components/Admin/Reservation/CreateReservation";
import ListReservation from "@/components/Admin/Reservation/ListReservation";
import UpdateReservation from "@/components/Admin/Reservation/UpdateReservation";
import TableManagement from "@/components/Admin/TableManagement";
import ProductDetail from "@/components/layouts/ProductDetail";
import { LoginPage } from "@/pages/auth/LoginPage";
import { ForgotPasswordPage } from "@/pages/auth/PasswordPage";
import { RegisterPage } from "@/pages/auth/Register";
import { ResetPasswordPage } from "@/pages/auth/ResetPasswordPage";
import CategoryAdd from "@/pages/dashboard/category/CategoryAdd";
import CategoryList from "@/pages/dashboard/category/CategoryList";
import CategoryUpdate from "@/pages/dashboard/category/CategoryUpdate";
import Dashboard from "@/pages/dashboard/Dashboard";
import { ProfileAdmin } from "@/pages/dashboard/Profile";
import UserAdd from "@/pages/dashboard/users/UserAdd";
import UserList from "@/pages/dashboard/users/Userlist";
import UserUpdate from "@/pages/dashboard/users/UserUpdate";
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
        element: <CategoryList />,
      },
      {
        path: "categories/add",
        element: <CategoryAdd />,
      },
      {
        path: "categories/:id/update",
        element: <CategoryUpdate />,
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
        path: "tables/:reservationId",
        element: <TableManagement />,
        // loader: teamLoader,
      },
      {
        path: "reservations/createReservation/:tableId",
        element: <CreateReservation />,
      },
      {
        path: "reservations/updateReservation/:reservationId",
        element: <UpdateReservation />,
        // loader: teamLoader,
      },
      {
        path: "listReser",
        element: <ListReservation />,
        // loader: teamLoader,
      },
      {
        path: "foodOrder/:reservationId",
        element: <FoodOrder />,
      },
      {
        path: "completedBill/:billId",
        element: <CompletedBill />,
        // loader: teamLoader,
      },
      {
        path: "users",
        element: <UserList />,
      },
      {
        path: "users/add",
        element: <UserAdd />,
      },
      {
        path: "users/edit/:id",
        element: <UserUpdate />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
