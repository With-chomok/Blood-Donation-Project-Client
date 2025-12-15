import {   useContext } from "react";

import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../context/AuthContext";
import Loading from "../components/Loader/Loading";


const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
const location = useLocation();
  if (loading) {
    return <Loading></Loading>;
  }

  if (!user) {
      return <Navigate to="/login" state={location.pathname} />;

  }

  return children;
};

export default PrivateRoute;