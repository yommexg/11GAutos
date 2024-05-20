import { ChangeEvent, useState } from "react";
import LoginBanner from "./loginBanner";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import { RootState, useAppDispatch } from "../../redux/store";
import Logo from "../../utils/logo";
import Spinner from "../Spinner";
import { loginAsync } from "../../redux/slice/loginSlice";
import { scrollToTop } from "../../utils/scrollToTop";

const Login: React.FC = () => {
  const location = useLocation();

  const regNewEmail = (location?.state as { email: string })?.email;

  const [email, setEmail] = useState<string>(regNewEmail ? regNewEmail : "");
  const [password, setPassword] = useState<string>("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const loading = useSelector((state: RootState) => state.login.loading);

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

  const handleVerify = () => {
    if (!email || !password) {
      toast.error("Please Input all fields");
    } else {
      dispatch(
        loginAsync({
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
          <div className="flex justify-between flex-col gap-4 mx-5 md:mx-0">
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
