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

function App() {
  const [languages, setLanguages] = useState(null);
  const getLanguages = async () => {
    const url =
      "https://data.gov.au/data/api/3/action/datastore_search_sql?sql=SELECT%20*%20from%20%22e9a9ea06-d821-4b53-a05f-877409a1a19c%22";
    const res = await fetch(url);
    const data = await res.json();
    setLanguages(data.result.records);
  };

  useEffect(() => {
    getLanguages();
  }, []);

  return (
    <ChakraProvider>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <WelcomeMsg />
              {languages && <Map languages={languages} />}
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/recordguide" element={<RecordGuide />} />
      </Routes>
      <Footer />
    </ChakraProvider>
  );
}

export default App;
