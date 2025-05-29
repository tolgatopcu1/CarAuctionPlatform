import { createBrowserRouter } from "react-router-dom";
import VehicleList from "../features/vehicles/VehicleList";
import NotFound from "../components/NotFound";
import MainLayout from "../pages/MainLayout";
import Home from "../components/Home";
import VehicleDetails from "../features/vehicles/VehicleDetails";
import Register from "../features/account/Register";
import LoginForm from "../features/account/Login";
import CheckoutWrapper from "../features/paymentHistory/CheckoutWrapper";
import Unauthorized from "../components/Unauthorized";
import AdminRoute from "../features/admin/AdminRoute";
import AdminDeleteVehicle from "../features/admin/AdminDeleteVehicle";
import SellForm from "../features/vehicles/CreateVehicleForm";
import AdminVehicleList from "../features/admin/AdminVehicleList";
import Profile from "../components/Profile";


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />, // 🔹 Burada kullandık
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "register",
        element: <Register />
      },
      {
        path: "login",
        element: <LoginForm />
      },
      {
        path: "unauthorized",
        element: <Unauthorized />
      },
      {
        path: "Sell",
        element: <SellForm />
      },
      {
        path: "Profile",
        element: <Profile />
      },
      {
        path: "vehicles",
        children: [
          {
            index: true,
            element: <VehicleList />,
          },
          {
            path: ":id",
            element: <VehicleDetails />,
          },
        ],
      },
      {
        path: "payment",
        children: [
          {
            path: ":vehicleId",
            element: <CheckoutWrapper  />
          },
        ],
      },
      {
        path: "admin",
        children: [
          {
            path: "vehicle-list",
            element: <AdminRoute>
                      <AdminVehicleList />
                    </AdminRoute>
          },
          {
            path: "delete-vehicle/:id",
            element: <AdminRoute>
                      <AdminDeleteVehicle />
                    </AdminRoute>
          },
        ],
      }
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);


export default router;
