import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./containers/Home";
import NewCars from "./containers/NewCars";
import UsedCars from "./containers/UsedCars";
import CarAssesories from "./containers/CarAss";
import SellCars from "./containers/SellCars";
import Spinner from "./components/Spinner";

import Login from "./components/Auth/login";
import VerifyEmail from "./components/Auth/verifyEmail";
import ForgotPassword from "./components/Auth/forgotPassword";
import ForgotOTP from "./components/Auth/forgotOTP";
import OneTimePassword from "./components/Auth/otp";
import Register from "./components/Auth/register";
import ResetPassword from "./components/Auth/resetPassword";

import { AppDispatch, RootState } from "./redux/store";
import { getUser } from "./redux/slice/getUserSlice";

function App() {
  const location = useLocation();

  const loading = useSelector((state: RootState) => state.getUser.loading);

  const dispatch: AppDispatch = useDispatch();
  const userId =
    location.state && location.state.userId
      ? (location.state as { userId: string }).userId
      : null;

  const accessToken =
    location.state && location.state.accessToken
      ? (location.state as { accessToken: string }).accessToken
      : null;

  useEffect(() => {
    if (accessToken && userId) {
      dispatch(
        getUser({
          accessToken,
          userId,
        })
      );
    }
  }, [dispatch, accessToken, userId]);
  return (
    <>
      {loading && <Spinner />}

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
          <Route path="/forgot-otp" element={<ForgotOTP />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
