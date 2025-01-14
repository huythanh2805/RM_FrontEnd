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
import { RoleProtectComponentAdmin, RoleProtectComponentClient } from "@/components/ProtectedComponent";
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
import { ExportNotesCreate } from "@/pages/dashboard/export-notes/ExportNotesCreate";
import { ExportNotesDetail } from "@/pages/dashboard/export-notes/ExportNotesDetail";
import { ExportNotesList } from "@/pages/dashboard/export-notes/ExportNotesList";
import FeedbackList from "@/pages/dashboard/feedback/FeedbackList";
import { ImportNotesCreate } from "@/pages/dashboard/import-notes/ImportNotesCreate";
import { ImportNotesDetail } from "@/pages/dashboard/import-notes/ImportNotesDetail";
import { ImportNotesList } from "@/pages/dashboard/import-notes/ImportNotesList";
import LayoutAdmin from "@/pages/dashboard/LayoutAdmin";
import { ProductCreate } from "@/pages/dashboard/products/ProductCreate";
import ProductHistory from "@/pages/dashboard/products/ProductHistory";
import { ProductList } from "@/pages/dashboard/products/ProductList";
import { ProductUpdate } from "@/pages/dashboard/products/ProductUpdate";
import { ProfileAdmin } from "@/pages/dashboard/Profile";
import { SellerCreate } from "@/pages/dashboard/sellers/SellerCreate";
import { SellerList } from "@/pages/dashboard/sellers/SellerList";
import { SellerUpdate } from "@/pages/dashboard/sellers/SellerUpdate";
import SetComboAdd from "@/pages/dashboard/setCombo/SetComboAdd";
import SetComboDetail from "@/pages/dashboard/setCombo/SetComboDetail";
import SetComboList from "@/pages/dashboard/setCombo/SetComboList";
import SetComboUpdate from "@/pages/dashboard/setCombo/SetComboUpdate";
import { HistoryTakeInventory } from "@/pages/dashboard/stocks/HistoryTakeInventory";
import { StockList } from "@/pages/dashboard/stocks/StockList";
import { TakeInventory } from "@/pages/dashboard/stocks/TakeInventory";
import { UserReservations } from "@/pages/dashboard/users/HistoryReservationUser";
import UserAdd from "@/pages/dashboard/users/UserAdd";
import UserList from "@/pages/dashboard/users/Userlist";
import UserListRole from "@/pages/dashboard/users/UserListRole";
import UserUpdate from "@/pages/dashboard/users/UserUpdate";
import WorkScheduleAdd from "@/pages/dashboard/workSchedule/workScheduleAdd";
import WorkScheduleList from "@/pages/dashboard/workSchedule/workScheduleList";
import WorkScheduleUpdate from "@/pages/dashboard/workSchedule/workScheduleUpdate";
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
      <RoleProtectComponentClient
        isRoleRequiredArrays={["ADMIN", "CASHIER", "WAREHOUSE", "ORDER", "CHEF"]}
      >
        <LayoutAdmin />
      </RoleProtectComponentClient>
    ),
    children: [
      {
        path: "/admin",
        element: <Dashboard />,
      },
      {
        path: "discounts",
        element:
          <RoleProtectComponentAdmin isRoleRequiredArrays={["ADMIN"]}>
            <CreateDiscount />
          </RoleProtectComponentAdmin>
      },
      {
        path: "listDiscounts",
        element:
          <RoleProtectComponentAdmin isRoleRequiredArrays={["ADMIN"]}>
            <ListDiscount />
          </RoleProtectComponentAdmin>,
      },
      {
        path: "updateDiscount/:id",
        element:  <RoleProtectComponentAdmin isRoleRequiredArrays={["ADMIN"]}>
        <UpdateDiscount />
      </RoleProtectComponentAdmin>,
      },
      {
        path: "categories",
        element:
          <RoleProtectComponentAdmin isRoleRequiredArrays={["ADMIN"]}>
            <CategoryList />
          </RoleProtectComponentAdmin>,
      },
      {
        path: "categories/add",
        element: <RoleProtectComponentAdmin isRoleRequiredArrays={["ADMIN"]}>
        <CategoryAdd /> 
      </RoleProtectComponentAdmin>,
      },
      {
        path: "categories/:id/update",
        element:  <RoleProtectComponentAdmin isRoleRequiredArrays={["ADMIN"]}>
        <CategoryUpdate />
      </RoleProtectComponentAdmin>,
      },
      {
        path: "employees",
        element:
          <RoleProtectComponentAdmin isRoleRequiredArrays={["ADMIN"]}>
            <EmployeeList />
          </RoleProtectComponentAdmin>,
      },
      {
        path: "employees/add",
        element: <RoleProtectComponentAdmin isRoleRequiredArrays={["ADMIN"]}>
        <EmployeeAdd />
      </RoleProtectComponentAdmin>,
      },
      {
        path: "employees/:id/update",
        element: <RoleProtectComponentAdmin isRoleRequiredArrays={["ADMIN"]}>
        <EmployeeUpdate />
      </RoleProtectComponentAdmin>,
      },
      {
        path: "workSchedule",
        element:
          <RoleProtectComponentAdmin isRoleRequiredArrays={["ADMIN"]}>
            <WorkScheduleList />
          </RoleProtectComponentAdmin>,
      },
      {
        path: "addWorkSchedule",
        element: <RoleProtectComponentAdmin isRoleRequiredArrays={["ADMIN"]}>
        <WorkScheduleAdd />
      </RoleProtectComponentAdmin>,
      },
      {
        path: "listWorkSchedule",
        element: <RoleProtectComponentAdmin isRoleRequiredArrays={["ADMIN"]}>
       <WorkScheduleList />
      </RoleProtectComponentAdmin>,
      },
      {
        path: "workSchedule/:id/update",
        element: <RoleProtectComponentAdmin isRoleRequiredArrays={["ADMIN"]}>
        <WorkScheduleUpdate />
      </RoleProtectComponentAdmin>,
      },
      {
        path: "dishes",
        element:
          <RoleProtectComponentAdmin isRoleRequiredArrays={["ADMIN"]}>
            <DishList />
          </RoleProtectComponentAdmin>,
      },
      {
        path: "dishes/add",
        element:  <RoleProtectComponentAdmin isRoleRequiredArrays={["ADMIN"]}>
        <DishAdd />
      </RoleProtectComponentAdmin>,
      },
      {
        path: "dishes/:id/update",
        element: <RoleProtectComponentAdmin isRoleRequiredArrays={["ADMIN"]}>
        <DishUpdate />
      </RoleProtectComponentAdmin>,
      },
      {
        path: "dishes/:id/detail",
        element:  <RoleProtectComponentAdmin isRoleRequiredArrays={["ADMIN"]}>
        <DishDetail />
      </RoleProtectComponentAdmin>,
      },
      {
        path: "proAdmin",
        element: <ProfileAdmin />,
      },
      {
        path: "tables",
        element:
          <RoleProtectComponentAdmin isRoleRequiredArrays={["ADMIN", "ORDER"]}>
            <TableManagement />
          </RoleProtectComponentAdmin>,
      },
      {
        path: "tables/:reservationId",
        element:  <RoleProtectComponentAdmin isRoleRequiredArrays={["ADMIN", "ORDER"]}>
        <TableManagement />
      </RoleProtectComponentAdmin>,
      },
      {
        path: "reservations/createReservation/:tableId",
        element:  <RoleProtectComponentAdmin isRoleRequiredArrays={["ADMIN", "ORDER"]}>
        <CreateReservation />
      </RoleProtectComponentAdmin>,
      },
      {
        path: "reservations/updateReservation/:reservationId",
        element:  <RoleProtectComponentAdmin isRoleRequiredArrays={["ADMIN", "ORDER"]}>
        <UpdateReservation />
      </RoleProtectComponentAdmin>,
      },
      {
        path: "listReser",
        element:
          <RoleProtectComponentAdmin isRoleRequiredArrays={["ADMIN", "CASHIER", "ORDER"]}>
            <ListReservation />
          </RoleProtectComponentAdmin>,
      },
      {
        path: "foodOrder/:reservationId/",
        element: <RoleProtectComponentAdmin isRoleRequiredArrays={["ADMIN", "CASHIER", "ORDER"]}>
        <FoodOrder />
      </RoleProtectComponentAdmin>,
      },
      {
        path: "completedBill/:billId",
        element: <CompletedBill />,
      },
      {
        path: "users",
        element:
          <RoleProtectComponentAdmin isRoleRequiredArrays={["ADMIN"]}>
            <UserList />
          </RoleProtectComponentAdmin>,
      },
      {
        path: "users/add",
        element:  <RoleProtectComponentAdmin isRoleRequiredArrays={["ADMIN"]}>
        <UserAdd />
      </RoleProtectComponentAdmin>,
      },
      {
        path: "users/staff-accounts",
        element:  <RoleProtectComponentAdmin isRoleRequiredArrays={["ADMIN"]}>
        <UserListRole />
      </RoleProtectComponentAdmin>,
      },
      {
        path: "users/reservations/:userId",
        element:  <RoleProtectComponentAdmin isRoleRequiredArrays={["ADMIN"]}>
        <UserReservations />
      </RoleProtectComponentAdmin>,
      },
      {
        path: "users/edit/:id",
        element:  <RoleProtectComponentAdmin isRoleRequiredArrays={["ADMIN"]}>
        <UserUpdate />
      </RoleProtectComponentAdmin>,
      },
      {
        path: "setCombos",
        element:
          <RoleProtectComponentAdmin isRoleRequiredArrays={["ADMIN"]}>
            <SetComboList />
          </RoleProtectComponentAdmin>,
      },
      {
        path: "setCombos/add",
        element:  <RoleProtectComponentAdmin isRoleRequiredArrays={["ADMIN"]}>
        <SetComboAdd />
      </RoleProtectComponentAdmin>,
      },
      {
        path: "setCombos/:id/update",
        element: <RoleProtectComponentAdmin isRoleRequiredArrays={["ADMIN"]}>
        <SetComboUpdate />
      </RoleProtectComponentAdmin>,
      },
      {
        path: "setCombos/:id/detail",
        element: <RoleProtectComponentAdmin isRoleRequiredArrays={["ADMIN"]}>
        <SetComboDetail />
      </RoleProtectComponentAdmin>,
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
        element:
          <RoleProtectComponentAdmin isRoleRequiredArrays={["ADMIN"]}>
            <FeedbackList />
          </RoleProtectComponentAdmin>,
      },
      {
        path: "order-history/:id",
        element: <RoleProtectComponentAdmin isRoleRequiredArrays={["ADMIN", "WAREHOUSE"]}>
        <OrderHistory />
      </RoleProtectComponentAdmin>,
      },
      {
        path: "kitchen",
        element:
          <RoleProtectComponentAdmin isRoleRequiredArrays={["ADMIN", "WAREHOUSE"]}>
            <Kitchen />
          </RoleProtectComponentAdmin>,
      },
      {
        path: "sellers",
        element:
          <RoleProtectComponentAdmin isRoleRequiredArrays={["ADMIN", "WAREHOUSE"]}>
            <SellerList />
          </RoleProtectComponentAdmin>,
      },
      {
        path: "sellers/create",
        element:  <RoleProtectComponentAdmin isRoleRequiredArrays={["ADMIN", "WAREHOUSE"]}>
        <SellerCreate />
      </RoleProtectComponentAdmin>,
      },
      {
        path: "sellers/update/:id",
        element:  <RoleProtectComponentAdmin isRoleRequiredArrays={["ADMIN", "WAREHOUSE"]}>
        <SellerUpdate />
      </RoleProtectComponentAdmin>,
      },
      {
        path: "products",
        element:
          <RoleProtectComponentAdmin isRoleRequiredArrays={["ADMIN", "WAREHOUSE"]}>
            <ProductList />
          </RoleProtectComponentAdmin>,
      },
      {
        path: "products/create",
        element:  <RoleProtectComponentAdmin isRoleRequiredArrays={["ADMIN", "WAREHOUSE"]}>
        <ProductCreate /> 
      </RoleProtectComponentAdmin>,
      },
      {
        path: "products/:productId/history",
        element:  <RoleProtectComponentAdmin isRoleRequiredArrays={["ADMIN", "WAREHOUSE"]}>
        <ProductHistory /> 
      </RoleProtectComponentAdmin>,
      },
      {
        path: "products/update/:id",
        element:  <RoleProtectComponentAdmin isRoleRequiredArrays={["ADMIN", "WAREHOUSE"]}>
        <ProductUpdate />
      </RoleProtectComponentAdmin>,
      },
      {
        path: "stocks",
        element:
          <RoleProtectComponentAdmin isRoleRequiredArrays={["ADMIN", "WAREHOUSE"]}>
            <StockList />
          </RoleProtectComponentAdmin>,
      },
      {
        path: "import-notes",
        element:
          <RoleProtectComponentAdmin isRoleRequiredArrays={["ADMIN", "WAREHOUSE"]}>
            <ImportNotesList />,
          </RoleProtectComponentAdmin>,
      },
      {
        path: "import-notes/:id",
        element:  <RoleProtectComponentAdmin isRoleRequiredArrays={["ADMIN", "WAREHOUSE"]}>
        <ImportNotesDetail />
       </RoleProtectComponentAdmin>,
      },
      {
        path: "import-notes/create",
        element:  <RoleProtectComponentAdmin isRoleRequiredArrays={["ADMIN", "WAREHOUSE"]}>
       <ImportNotesCreate />
      </RoleProtectComponentAdmin>,
      },
      {
        path: "export-notes",
        element:
          <RoleProtectComponentAdmin isRoleRequiredArrays={["ADMIN", "WAREHOUSE"]}>
            <ExportNotesList />
          </RoleProtectComponentAdmin>,
      },
      {
        path: "export-notes/:id",
        element:  <RoleProtectComponentAdmin isRoleRequiredArrays={["ADMIN", "WAREHOUSE"]}>
        <ExportNotesDetail />
      </RoleProtectComponentAdmin>,
      },
      {
        path: "export-notes/create",
        element:  <RoleProtectComponentAdmin isRoleRequiredArrays={["ADMIN", "WAREHOUSE"]}>
        <ExportNotesCreate />
      </RoleProtectComponentAdmin>,
      },
      {
        path: "take-inventory",
        element:
          <RoleProtectComponentAdmin isRoleRequiredArrays={["ADMIN", "WAREHOUSE"]}>
            <TakeInventory />
          </RoleProtectComponentAdmin>,
      },
      {
        path: "history-take-inventory/:id",
        element:
          <RoleProtectComponentAdmin isRoleRequiredArrays={["ADMIN", "WAREHOUSE"]}>
            <HistoryTakeInventory />
          </RoleProtectComponentAdmin>,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
])

export default router;
