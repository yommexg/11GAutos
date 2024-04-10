import { Link } from "react-router-dom";
import Logo from "../../utils/logo";
import LoginBanner from "./loginBanner";
import { useState, ChangeEvent } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    setEmail(value);
  };

  const handleSendOTP = () => {};
  return (
    <div className="fixed z-50 right-0 top-0 left-0 bottom-0 outline-none focus:outline-none">
      <div className="border-0 rounded-lg shadow-lg flex w-[100%] h-full bg-slate-500 md:bg-white outline-none focus:outline-none">
        <LoginBanner />
        <div className="md:w-[50%] w-[100%] md:pl-32 flex gap-8 flex-col justify-center px-8">
          <p className="md:hidden block">
            <Logo />
          </p>
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
            Send OTP
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
