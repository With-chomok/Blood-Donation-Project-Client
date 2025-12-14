import React from "react";
import { createBrowserRouter } from "react-router";
import RootLayout from "../rootlayout/RootLayout";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import DashboardLayout from "../DashboardLayout/DashboardLayout";
import MainDashboard from "../pages/Dashboard/maindashboard/MAinDashboard";

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
        loader: () => {
          return fetch("areaDatas.json");
        }
      }
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout></DashboardLayout>,
    children: [
      {
        path:'main',
        element:<MainDashboard></MainDashboard>
      }

    ]
  }
]);
export default Router;
