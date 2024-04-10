import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./containers/Home";
import NewCars from "./containers/NewCars";
import UsedCars from "./containers/UsedCars";
import CarAssesories from "./containers/CarAss";
import SellCars from "./containers/SellCars";

import Login from "./components/Auth/login";
import VerifyEmail from "./components/Auth/verifyEmail";
import ForgotPassword from "./components/Auth/forgotPassword";
import OneTimePassword from "./components/Auth/otp";
import Register from "./components/Auth/register";

function App() {
  return (
    <>
      <Navbar />
      <div className="mt-[80px]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new-cars" element={<NewCars />} />
          <Route path="/used-cars" element={<UsedCars />} />
          <Route path="/car-ass" element={<CarAssesories />} />
          <Route path="/sell-car" element={<SellCars />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/otp" element={<OneTimePassword />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
