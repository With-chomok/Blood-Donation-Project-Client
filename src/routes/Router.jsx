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
      }
    ],
  },
  {
    path: "dashboard",
    element: <DashboardLayout></DashboardLayout>,
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

    ]
  }
]);
export default Router;
