import { Navigate } from "react-router-dom";
import { Spinner, Center } from "@chakra-ui/react";

const ProtectedRoute = ({ user, children }) => {
  if (user) {
    return children;
  } else if (user === null) {
    return (
      <Center h="200px" color="white">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Center>
    );
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
