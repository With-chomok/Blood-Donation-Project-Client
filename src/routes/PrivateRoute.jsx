import { useContext } from "react";

import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../context/AuthContext";
import Loading from "../components/Loader/Loading";

const PrivateRoute = ({ children }) => {
  const { user, loading, roleLoding, userStatus } = useContext(AuthContext);
  const location = useLocation();
  if (loading || roleLoding) {
    return <Loading></Loading>;
  }

  if (!user || !userStatus == 'active') {
    return <Navigate to="/login" state={location.pathname}  replace/>;
  }

  return children;
};

export default PrivateRoute;
