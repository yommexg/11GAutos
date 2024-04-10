import { ChangeEvent, useState } from "react";
import LoginBanner from "./loginBanner";
import { Link } from "react-router-dom";
import Logo from "../../utils/logo";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    setEmail(value);
  };
  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    setPassword(value);
  };

  const handleVerify = () => {};

  return (
    <div className="fixed z-50 right-0 top-0 left-0 bottom-0 outline-none focus:outline-none">
      <div className="border-0 rounded-lg shadow-lg flex w-[100%] h-full bg-slate-500 md:bg-white outline-none focus:outline-none">
        <LoginBanner />
        <div className="md:w-[50%] w-[100%] md:pl-32 flex gap-8 flex-col justify-center px-8">
          <p className="md:hidden block">
            <Logo />
          </p>
          <div>
            <h2 className="font-bold mb-3 text-3xl">LOGIN</h2>
            <p className="text-xs italic text-slate-400">
              Login to enjoy full experience
            </p>
          </div>
          <div className="flex flex-col gap-3 lg:w-[50%]">
            <label htmlFor="email">Email Address:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className="bg-slate-200 p-2 text-black font-semibold"
            />
          </div>

          <div className="flex flex-col gap-3 lg:w-[50%]">
            <label htmlFor="password">Password:</label>
            <div className="relative">
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                value={password}
                onChange={handlePasswordChange}
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
            className="p-4 bg-slate-900 text-white hover:opacity-50 md:w-[50%]"
            onClick={handleVerify}
          >
            Login
          </button>
          <div className="flex justify-between md:flex-col md:gap-4 mx-5 md:mx-0">
            <p className="text-xs italic">
              Dont have an account?{" "}
              <Link
                to="/verify-email"
                className="text-base font-semibold not-italic ml-1 hover:text-slate-400 underline"
              >
                Register{" "}
              </Link>
            </p>
            <p className="text-xs italic">
              Forgot Passowrd?{" "}
              <Link
                to="/forgot-password"
                className="text-base font-semibold not-italic ml-1 hover:text-slate-400 underline"
              >
                Click Here
              </Link>
            </p>
          </div>
        </div>
      </div>
      <p className=" hidden md:block text-white absolute text-sm w-[50%] bottom-0 text-center p-6 bg-black">
        © 2024 11G Autos. All rights reserved.
      </p>
    </div>
  );
};

export default Login;
