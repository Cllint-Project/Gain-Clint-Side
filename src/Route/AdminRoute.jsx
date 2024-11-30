import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { InfinitySpin } from "react-loader-spinner";
import { AuthContext } from "../Auth/AuthProvider";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center my-[150px]">
        <InfinitySpin
          visible={true}
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="infinity-spin-loading"
        />
      </div>
    );
  }

  if (user?.role === "admin") {
    return children;
  }

  return <Navigate state={{ from: location.pathname }} to="/login" replace />;
};

export default AdminRoute;
