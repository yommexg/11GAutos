import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import Logo from "../../utils/logo";
import LoginBanner from "./loginBanner";
import { RootState, useAppDispatch } from "../../redux/store";
import Spinner from "../Spinner";
import { resetPassword } from "../../redux/slice/forgotPasswordSlice.";

const ResetPassword: React.FC = () => {
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const email = (location.state as { email: string }).email;

  const loading = useSelector((state: RootState) => state.forgot.loading);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?!.*\s).{8,}$/;
    if (!passwordRegex.test(value)) {
      setPasswordError(
        "Password must be at least 8 characters long and contain at least one number, one special character, and no spaces"
      );
    } else {
      setPasswordError("");
    }
  };

  const handleReset = async () => {
    if (!password) {
      toast.error("Password is Required!!!");
    } else if (passwordError) {
      toast.error("Invalid Passeord Check Description");
    } else {
      dispatch(
        resetPassword({
          email,
          pwd: password,
          extra: {
            navigate,
          },
        })
      );
    }
  };

  return (
    <div className="fixed z-50 right-0 top-0 left-0 bottom-0 outline-none focus:outline-none">
      <div className="border-0 rounded-lg shadow-lg flex w-[100%] h-full bg-slate-500 md:bg-white outline-none focus:outline-none">
        {loading && <Spinner />}
        <p
          className="absolute right-5 top-3 text-5xl text-slate-700 cursor-pointer"
          onClick={() => navigate("/")}
        >
          x
        </p>
        <LoginBanner />
        <div className="md:w-[50%] w-[100%] lg:pl-32 flex gap-8 flex-col justify-center px-8">
          <div className="md:hidden block">
            <Logo />
          </div>
          <div>
            <h2 className="font-bold mb-3 text-2xl">Reset Password</h2>
            <p className="text-sm italic text-slate-900">
              Password must be at least 8 characters long and contain at least
              one number, one special character, and no spaces
            </p>
          </div>
          <div className="flex flex-col gap-3 lg:w-[50%]">
            <label htmlFor="password">Password:</label>
            <div className="relative">
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => handlePasswordChange(e.target.value)}
                className="bg-slate-200 p-2 text-black font-semibold w-full"
              />
              <button
                className="absolute right-2 top-3 text-xs"
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            className="p-4 bg-slate-900 md:w-[50%] text-white hover:opacity-50"
            onClick={handleReset}
          >
            Submit
          </button>
        </div>
      </div>
      <p className=" hidden md:block text-white absolute text-sm w-[50%] bottom-0 text-center p-6 bg-black">
        © 2024 11G Autos. All rights reserved.
      </p>
    </div>
  );
};

export default ResetPassword;
