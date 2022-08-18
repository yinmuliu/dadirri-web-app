import "./App.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import WelcomeMsg from "./components/Homepage/WelcomeMsg";
import Map from "./components/Homepage/Map";

function App() {
  return (
    <div className="App">
      <NavBar />
      <h1>Dadirri</h1>
      <WelcomeMsg />
      <Map />
      <Footer />
    </div>
  );
}

export default App;
