import CompletedBill from "@/components/Admin/Bill/CompletedBill";
import CreateDiscount from "@/components/Admin/Discount/CreateDiscount";
import ListDiscount from "@/components/Admin/Discount/ListDiscount";
import UpdateDiscount from "@/components/Admin/Discount/UpdateDiscount";
import FoodOrder from "@/components/Admin/FoodOrder/FoodOrder";
import OrderHistory from "@/components/Admin/FoodOrder/Order-history";
import Kitchen from "@/components/Admin/Kitchen/Kitchen";
import CreateReservation from "@/components/Admin/Reservation/CreateReservation";
import ListReservation from "@/components/Admin/Reservation/ListReservation";
import UpdateReservation from "@/components/Admin/Reservation/UpdateReservation";
import TableManagement from "@/components/Admin/TableManagement";
import ProductDetail from "@/components/layouts/ProductDetail";
import ProtectedComponent from "@/components/ProtectedComponent";
import { LoginPage } from "@/pages/auth/LoginPage";
import { ForgotPasswordPage } from "@/pages/auth/PasswordPage";
import { RegisterPage } from "@/pages/auth/Register";
import { ResetPasswordPage } from "@/pages/auth/ResetPasswordPage";
import BillDetail from "@/pages/dashboard/bill/BillDetail";
import BillList from "@/pages/dashboard/bill/BillList";
import CategoryAdd from "@/pages/dashboard/category/CategoryAdd";
import CategoryList from "@/pages/dashboard/category/CategoryList";
import CategoryUpdate from "@/pages/dashboard/category/CategoryUpdate";
import Dashboard from "@/pages/dashboard/Dashboard";
import DishAdd from "@/pages/dashboard/dish/DishAdd";
import DishDetail from "@/pages/dashboard/dish/DishDetail";
import DishList from "@/pages/dashboard/dish/DishList";
import DishUpdate from "@/pages/dashboard/dish/DishUpdate";
import EmployeeAdd from "@/pages/dashboard/employee/EmployeeAdd";
import EmployeeList from "@/pages/dashboard/employee/EmployeeList";
import EmployeeUpdate from "@/pages/dashboard/employee/EmployeeUpdate";
import FeedbackList from "@/pages/dashboard/feedback/FeedbackList";
import LayoutAdmin from "@/pages/dashboard/LayoutAdmin";
import { ProfileAdmin } from "@/pages/dashboard/Profile";
import SetComboAdd from "@/pages/dashboard/setCombo/SetComboAdd";
import SetComboDetail from "@/pages/dashboard/setCombo/SetComboDetail";
import SetComboList from "@/pages/dashboard/setCombo/SetComboList";
import SetComboUpdate from "@/pages/dashboard/setCombo/SetComboUpdate";
import UserAdd from "@/pages/dashboard/users/UserAdd";
import UserList from "@/pages/dashboard/users/Userlist";
import UserUpdate from "@/pages/dashboard/users/UserUpdate";
import WorkSchedule from "@/pages/dashboard/workSchedule/workSchedule";
import WorkScheduleAdd from "@/pages/dashboard/workSchedule/workScheduleAdd";
import About from "@/pages/home/About";
import { Checkout } from "@/pages/home/Checkout";
import ComboDetail from "@/pages/home/ComboDetail";
import ContactUs from "@/pages/home/ContactUs";
import { HistoryReservation } from "@/pages/home/HistoryReservation";
import { HistoryReservationDetail } from "@/pages/home/HistoryReservationDetails";
import Home from "@/pages/home/Home";
import HomeLayout from "@/pages/home/HomeLayout";
import Menu from "@/pages/home/Menu";
import NotFound from "@/pages/home/NotFound";
import { Profile } from "@/pages/home/Profile";
import Promotion from "@/pages/home/Promotion";
import Reservation from "@/pages/home/Reservation";
import ThanksPage from "@/pages/home/ThanksPage";
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
        path: "promotion",
        element: <Promotion />,
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
        path: "contact",
        element: <ContactUs />,
      },
      {
        path: "dishes/:id",
        element: <ProductDetail />,
      },
      {
        path: "combos/:id",
        element: <ComboDetail />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "history/:userId",
        element: <HistoryReservation />,
      },
      {
        path: "history-details/:reservation_id",
        element: <HistoryReservationDetail />,
      },
      {
        path: "payment",
        element: <Checkout />,
      },
      {
        path: "thanks",
        element: <ThanksPage />,
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
    path: "/admin",
    element: (
      <ProtectedComponent>
        <LayoutAdmin />
      </ProtectedComponent>
    ),
    children: [
      {
        path: "/admin",
        element: <Dashboard />,
      },
      {
        path: "discounts",
        element: <CreateDiscount />,
      },
      {
        path: "listDiscounts",
        element: <ListDiscount />,
      },
      {
        path: "updateDiscount/:id",
        element: <UpdateDiscount />,
      },
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
        path: "employees",
        element: <EmployeeList />,
      },
      {
        path: "employees/add",
        element: <EmployeeAdd />,
      },
      {
        path: "workSchedule",
        element: <WorkSchedule />,
      },
      {
        path: "addWorkSchedule",
        element: <WorkScheduleAdd />,
      },
      {
        path: "employees/:id/update",
        element: <EmployeeUpdate />,
      },
      {
        path: "dishes",
        element: <DishList />,
      },
      {
        path: "dishes/add",
        element: <DishAdd />,
      },
      {
        path: "dishes/:id/update",
        element: <DishUpdate />,
      },
      {
        path: "dishes/:id/detail",
        element: <DishDetail />,
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
      },
      {
        path: "reservations/createReservation/:tableId",
        element: <CreateReservation />,
      },
      {
        path: "reservations/updateReservation/:reservationId",
        element: <UpdateReservation />,
      },
      {
        path: "listReser",
        element: <ListReservation />,
      },
      {
        path: "foodOrder/:reservationId/",
        element: <FoodOrder />,
      },
      {
        path: "completedBill/:billId",
        element: <CompletedBill />,
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
      {
        path: "setCombos",
        element: <SetComboList />,
      },
      {
        path: "setCombos/add",
        element: <SetComboAdd />,
      },
      {
        path: "setCombos/:id/update",
        element: <SetComboUpdate />,
      },
      {
        path: "setCombos/:id/detail",
        element: <SetComboDetail />,
      },
      {
        path: "bills",
        element: <BillList />,
      },
      {
        path: "bills/:id/detail",
        element: <BillDetail />,
      },
      {
        path: "feedbacks",
        element: <FeedbackList />,
      },
      {
        path: "order-history/:id",
        element: <OrderHistory />,
      },
      {
        path: "kitchen",
        element: <Kitchen />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
