import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ user, children }) => {
  if (user) {
    return children;
  } else if (user === null) {
    return <p>loading...</p>;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
