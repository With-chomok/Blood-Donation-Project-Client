import React from "react";
import { createBrowserRouter } from "react-router";
import RootLayout from "../rootlayout/RootLayout";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import DashboardLayout from "../DashboardLayout/DashboardLayout";
import MainDashboard from "../pages/Dashboard/maindashboard/MAinDashboard";
import AddRequest from "../pages/Dashboard/AddRequest/AddRequest";
import Loading from "../components/Loader/Loading";
import PrivateRoute from "./PrivateRoute";
import AllUsers from "../pages/AllUsers/AllUsers";
import MyRequest from "../pages/MyRequest/MyRequest";
import Donate from "../pages/Donate/Donate";
import Profile from "../components/Profile/Profile";
import PaymentSuccess from "../pages/PaymentSuccess/PaymentSuccess";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        path: "/",
        Component: Home
      },
      {
        path: "/login",
        Component: Login
      },
      {
        path: "/register",
        Component: Register,
        hydrateFallbackElement: <Loading></Loading>,
        loader: () => {
          return fetch("areaDatas.json");
        }
      },
      {
        path:"/donate",
        Component:Donate
      },
      {
        path:"/payment-success",
        Component: PaymentSuccess
      }
    ],
  },
  {
    path: "dashboard",
    element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
     children: [
      {
        index: true, 
        Component: MainDashboard,
      },
      {
        path: "add-request", 
        Component: AddRequest,
        hydrateFallbackElement: <Loading></Loading>,
        loader: () => {
          return fetch("/areaDatas.json");
        }
      },
      {
        path: "all-users",
        Component: AllUsers
      },
      {
        path: 'my-donation-requests',
        Component: MyRequest
      },
      {
        path:"profile",
        Component: Profile
      }

    ]
  }
]);
export default Router;
