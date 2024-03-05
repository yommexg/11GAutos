import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./containers/Home";
import NewCars from "./containers/NewCars";
import UsedCars from "./containers/UsedCars";
import CarAssesories from "./containers/CarAss";
import SellCars from "./containers/SellCars";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new-cars" element={<NewCars />} />
        <Route path="/used-cars" element={<UsedCars />} />
        <Route path="/car-ass" element={<CarAssesories />} />
        <Route path="/sell-car" element={<SellCars />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
