import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
// import { InfinitySpin } from "react-loader-spinner";
import { AuthContext } from "../Auth/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center my-[100px]">
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
        </div>
      </div>
    );
  }

  if (user && user?._id) {
    return children;
  }

  return <Navigate state={{ from: location.pathname }} to="/login" replace />;
};

export default PrivateRoute;
