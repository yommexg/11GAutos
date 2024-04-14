import { useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
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
import Logout from "./components/Auth/logout";

import { AppDispatch, RootState } from "./redux/store";
import { getUser } from "./redux/slice/getUserSlice";
import { jwtDecode } from "jwt-decode";
import { User } from "../types";

interface JwtPayload {
  UserInfo?: {
    _id: string;
  };
}

function App() {
  const loading = useSelector((state: RootState) => state.getUser.loading);
  const loading2 = useSelector((state: RootState) => state.logout.loading);

  const dispatch: AppDispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const userData = useSelector(
    (state: RootState) => state.getUser.userData as User
  );

  useEffect(() => {
    const accessToken: string | null = localStorage.getItem("accessToken");
    const decodedToken: JwtPayload | null = accessToken
      ? jwtDecode<JwtPayload>(accessToken)
      : null;
    const userId: string | undefined = decodedToken?.UserInfo?._id;

    if (accessToken && userId) {
      dispatch(
        getUser({
          accessToken,
          userId,
        })
      );
    }
  }, [dispatch]);

  return (
    <>
      {(loading || loading2) && <Spinner />}

      <Navbar />
      <div className="mt-[80px]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new-cars" element={<NewCars />} />
          <Route path="/used-cars" element={<UsedCars />} />
          <Route path="/car-ass" element={<CarAssesories />} />
          {Object.entries(userData)?.length !== 0 &&
          location.pathname === "/login" ? (
            (navigate("/"), null)
          ) : (
            <>
              <Route path="/login" element={<Login />} />
            </>
          )}
          <Route path="/sell-car" element={<SellCars />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/register-otp" element={<OneTimePassword />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-otp" element={<ForgotOTP />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
