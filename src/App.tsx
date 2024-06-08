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
import { getUser } from "./redux/slice/userSlice";
import { jwtDecode } from "jwt-decode";
import { User } from "../types";
import { getNewCars } from "./redux/slice/newCarSlice";
import { getUsedCars, getUsedCarsByUserId } from "./redux/slice/usedCarSlice";
import UsedCarDetails from "./containers/UsedCars/usedCarDetails";
import NewCarDetails from "./containers/NewCars/newCarDetails";
import { getCarItems } from "./redux/slice/carAss";
import CarItemDetails from "./containers/CarAss/carItemDetails";
import UploadedUsedCardDetails from "./containers/SellCars/uploadedUsedCardDetails";
import Settings from "./containers/Settings";

interface JwtPayload {
  UserInfo?: {
    _id: string;
  };
}

function App() {
  const loading = useSelector((state: RootState) => state.getUser.loading);
  const loading2 = useSelector((state: RootState) => state.logout.loading);
  const loading3 = useSelector((state: RootState) => state.newCar.loading);
  const loading4 = useSelector((state: RootState) => state.usedCar.loading);
  const loading5 = useSelector((state: RootState) => state.carAss.loading);

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
      dispatch(getUsedCarsByUserId({ userId }));
    }

    dispatch(getNewCars());
    dispatch(getUsedCars());
    dispatch(getCarItems());
  }, [dispatch]);

  return (
    <>
      {(loading || loading2 || loading3 || loading4 || loading5) && <Spinner />}

      <Navbar />
      <div className="mt-[80px]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new-cars" element={<NewCars />} />
          <Route path="/new-cars/:newCarId" element={<NewCarDetails />} />
          <Route path="/used-cars/:usedCarId" element={<UsedCarDetails />} />
          <Route path="/car-ass/:itemId" element={<CarItemDetails />} />
          <Route path="/used-cars" element={<UsedCars />} />
          <Route path="/car-ass" element={<CarAssesories />} />
          <Route path="/settings" element={<Settings />} />
          {Object.entries(userData)?.length !== 0 &&
          location.pathname === "/login" ? (
            (navigate("/"), null)
          ) : (
            <>
              <Route path="/login" element={<Login />} />
            </>
          )}
          <Route path="/sell-car" element={<SellCars />} />
          <Route
            path="/seller-car/:usedCarId"
            element={<UploadedUsedCardDetails />}
          />
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
