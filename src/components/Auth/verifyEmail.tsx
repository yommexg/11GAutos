import { ChangeEvent, useState } from "react";
import Logo from "../../utils/logo";
import { Link, useNavigate } from "react-router-dom";
import LoginBanner from "./loginBanner";

const VerifyEmail = () => {
  const [isValid, setIsValid] = useState(true);
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    setEmail(value);
    setIsValid(validateEmail(value));
  };

  const validateEmail = (email: string): boolean => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleVerify = () => {
    navigate("/otp");
  };

  return (
    <div className="fixed z-50 right-0 top-0 left-0 bottom-0 outline-none focus:outline-none">
      <div className="border-0 rounded-lg shadow-lg flex w-[100%] h-full bg-slate-500 md:bg-white outline-none focus:outline-none">
        <LoginBanner />
        <div className="md:w-[50%] w-[100%] md:pl-32 flex gap-8 flex-col justify-center px-8">
          <p className="md:hidden block">
            <Logo />
          </p>
          <div>
            <h2 className="font-bold mb-3 text-2xl">
              Verify Email Address to Create Account
            </h2>
            <p className="text-xs italic text-slate-400">
              Enter a valid Email Address
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
            {!isValid && (
              <p style={{ color: "red" }}>
                Please enter a valid email address.
              </p>
            )}
          </div>

          <button
            className="p-4 bg-slate-900 md:w-[50%] text-white hover:opacity-50"
            onClick={handleVerify}
          >
            Verify Now
          </button>
          <p className="text-xs italic">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-base font-semibold not-italic ml-1 hover:text-slate-400 underline"
            >
              Sign In
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

export default VerifyEmail;
