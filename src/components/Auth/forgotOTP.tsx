import React, { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../../utils/logo";
import LoginBanner from "./loginBanner";
import { toast } from "react-toastify";
import { verifyForgotOTPAsync } from "../../redux/slice/forgotPasswordSlice.";
import { RootState, useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import Spinner from "../Spinner";

const ForgotOTP: React.FC = () => {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const email = (location.state as { email: string }).email;

  const loading = useSelector((state: RootState) => state.forgot.loading);

  const handleVerifyOTP = () => {
    const enteredOTP = otp.join("");

    const hasEmpty = otp.some((element) => element === "");

    if (!enteredOTP) {
      toast.error("Enter OTP!!");
    } else if (hasEmpty) {
      toast.error("OTP is Not Complete");
    } else {
      dispatch(
        verifyForgotOTPAsync({
          email: email,
          OTP: enteredOTP,
          extra: {
            navigate,
          },
        })
      );
    }
  };

  const handleChange = (index: number, value: string) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Backspace" && index > 0 && !otp[index]) {
      const newOtp = [...otp];
      newOtp[index - 1] = "";
      setOtp(newOtp);
      inputRefs.current[index - 1].focus();
    } else if (event.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1].focus();
    } else if (event.key === "ArrowRight" && index < 5 && otp[index + 1]) {
      inputRefs.current[index + 1].focus();
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
            <h2 className="font-bold mb-3 text-2xl">
              Verify OTP to Change Password
            </h2>
            <p className="text-xs italic text-slate-400">
              Enter the otp code (6 digit code) sent to your email address
            </p>
          </div>
          <div className="flex flex-col gap-3 lg:w-[50%]">
            <label htmlFor="otp">Enter One Time Password(OTP):</label>

            {/* OTP Input Boxes */}
            <div className="flex gap-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(ref) =>
                    (inputRefs.current[index] = ref as HTMLInputElement)
                  }
                  type="text"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  maxLength={1}
                  className="w-9 h-9 text-center border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
              ))}
            </div>
          </div>
          <button
            className="p-4 bg-slate-900 w-[50%] text-white hover:opacity-50"
            onClick={handleVerifyOTP}
          >
            Verify OTP
          </button>
        </div>
      </div>
      <p className=" hidden md:block text-white absolute text-sm w-[50%] bottom-0 text-center p-6 bg-black">
        © 2024 11G Autos. All rights reserved.
      </p>
    </div>
  );
};

export default ForgotOTP;
