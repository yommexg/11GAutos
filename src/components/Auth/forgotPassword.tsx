import { useState, ChangeEvent } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import Logo from "../../utils/logo";
import LoginBanner from "./loginBanner";
import Spinner from "../Spinner";
import { RootState, useAppDispatch } from "../../redux/store";
import { verifyForgotEmailAsync } from "../../redux/slice/forgotPasswordSlice.";
import { toast } from "react-toastify";
import { scrollToTop } from "../../utils/scrollToTop";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");

  const loading = useSelector((state: RootState) => state.forgot.loading);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    setEmail(value);
  };

  const handleSendOTP = async () => {
    if (!email) {
      toast.error("Input Registered Email Address");
    } else {
      await dispatch(
        verifyForgotEmailAsync({
          email: email,
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
          onClick={() => {
            navigate(-1);
            scrollToTop();
          }}
        >
          x
        </p>
        <LoginBanner />
        <div className="md:w-[50%] w-[100%] lg:pl-32 flex gap-8 flex-col justify-center px-8">
          <div className="md:hidden block">
            <Logo />
          </div>
          <div>
            <h2 className="font-bold mb-3 text-2xl">Forgot Password</h2>
            <p className="text-xs italic text-slate-400">
              Enter your Registered Email Address
            </p>
          </div>
          <div className="flex flex-col gap-3 lg:w-[50%]">
            <label htmlFor="email">Email Address:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleChange}
              className="bg-slate-200 p-2 text-black font-semibold"
            />
          </div>

          <button
            className="p-4 bg-slate-900 md:w-[50%] text-white hover:opacity-50"
            onClick={handleSendOTP}
          >
            Click to Send OTP
          </button>
          <p className="text-xs italic">
            Remember Password?{" "}
            <Link
              to="/login"
              className="text-base font-semibold not-italic ml-1 hover:text-slate-400 underline"
            >
              Go Back
            </Link>
          </p>
        </div>
      </div>
      <p className=" hidden md:block text-white absolute text-sm w-[50%] bottom-0 text-center p-6 bg-black">
        © 2024 11G Autos. All rights reserved.
      </p>
    </div>
  );
};

export default ForgotPassword;
