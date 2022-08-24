import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import WelcomeMsg from "./components/Homepage/WelcomeMsg";
import Map from "./components/Homepage/Map";
import About from "./components/About";
import RecordGuide from "./components/RecordGuide";
import Login from "./components/Users/Login";
import Signup from "./components/Users/Signup";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [languages, setLanguages] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const getLanguages = async () => {
    const url =
      "https://data.gov.au/data/api/3/action/datastore_search_sql?sql=SELECT%20*%20from%20%22e9a9ea06-d821-4b53-a05f-877409a1a19c%22";
    const res = await fetch(url);
    const data = await res.json();
    setLanguages(data.result.records);
  };

  useEffect(() => {
    const checkLoggedIn = async () => {
      const res = await fetch("/is-authenticated");
      const data = await res.json();
      setUser(data.user);
    };
    if (!user) checkLoggedIn();
    getLanguages();
  }, []);

  const handleAuth = async (fields, whichForm) => {
    const res = await fetch(`/${whichForm}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fields),
    });
    const data = await res.json();
    setUser(data.user);
    navigate("/");
  };

  const handleLogout = async () => {
    const res = await fetch("/logout", {
      method: "POST",
    });
    const data = await res.json();
    if (data.success) setUser(undefined);
  };

  return (
    <ChakraProvider>
      <NavBar handleLogout={handleLogout} />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute user={user}>
              <WelcomeMsg user={user} />
              {languages && <Map languages={languages} />}
            </ProtectedRoute>
          }
        />

        <Route path="/login" element={<Login handleLogin={handleAuth} />} />

        <Route path="/signup" element={<Signup handleSignup={handleAuth} />} />
        <Route path="/about" element={<About />} />
        <Route path="/recordguide" element={<RecordGuide />} />
      </Routes>
      <Footer />
    </ChakraProvider>
  );
}

export default App;
