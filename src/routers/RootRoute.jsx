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
import { StockList } from "@/pages/dashboard/stocks/StockList";
import UserAdd from "@/pages/dashboard/users/UserAdd";
import UserList from "@/pages/dashboard/users/Userlist";
import UserUpdate from "@/pages/dashboard/users/UserUpdate";
import WorkSchedule from "@/pages/dashboard/workSchedule/workSchedule";
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
        element: <UpdateDiscount />,
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
        element: <CategoryAdd />,
      },
      {
        path: "categories/:id/update",
        element: <CategoryUpdate />,
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
        element: <EmployeeAdd />,
      },
      {
        path: "employees/:id/update",
        element: <EmployeeUpdate />,
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
        element: <WorkScheduleAdd />,
      },
      {
        path: "listWorkSchedule",
        element: <WorkScheduleList />,
      },
      {
        path: "workSchedule/:id/update",
        element: <WorkScheduleUpdate />,
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
        element: 
            <RoleProtectComponentAdmin isRoleRequiredArrays={["ADMIN", "ORDER"]}>
            <TableManagement />
          </RoleProtectComponentAdmin>,
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
        element:  
            <RoleProtectComponentAdmin isRoleRequiredArrays={["ADMIN", "CASHIER"]}>
            <ListReservation />
          </RoleProtectComponentAdmin>,
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
        element: 
            <RoleProtectComponentAdmin isRoleRequiredArrays={["ADMIN"]}>
              <UserList />
          </RoleProtectComponentAdmin>,
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
        element:  
            <RoleProtectComponentAdmin isRoleRequiredArrays={["ADMIN"]}>
            <SetComboList />
          </RoleProtectComponentAdmin>,
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
        element:  
            <RoleProtectComponentAdmin isRoleRequiredArrays={["ADMIN"]}>
            <FeedbackList />
            </RoleProtectComponentAdmin>,
      },
      {
        path: "order-history/:id",
        element: <OrderHistory />,
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
        element: <SellerCreate />,
      },
      {
        path: "sellers/update/:id",
        element: <SellerUpdate />,
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
        element: <ProductCreate />,
      },
      {
        path: "products/update/:id",
        element: <ProductUpdate />,
      },
      {
        path: "stocks",
        element: 
            <RoleProtectComponentAdmin isRoleRequiredArrays={["ADMIN", "WAREHOUSE"]}>
            <StockList/>
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
        element: <ImportNotesDetail />,
      },
      {
        path: "import-notes/create",
        element: <ImportNotesCreate />,
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
        element: <ExportNotesDetail />,
      },
      {
        path: "export-notes/create",
        element: <ExportNotesCreate />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
])

export default router;
