import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ user, children }) => {
  if (user) {
    return children;
  } else if (!user) {
    return <Navigate to="/login" />;
  } else {
    // authorised -> null
    return <p>loading...</p>;
  }
};

export default ProtectedRoute;
