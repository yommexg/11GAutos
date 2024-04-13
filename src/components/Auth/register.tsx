import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Logo from "../../utils/logo";
import LoginBanner from "./loginBanner";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const email = (location.state as { email: string }).email;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [houseNo, setHouseNo] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [passwordError, setPasswordError] = useState("");

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

  const handleRegister = () => {
    console.log(email);
  };

  return (
    <div className="fixed z-50 right-0 top-0 inset-0 left-0 bottom-0 outline-none focus:outline-none">
      <div className="border-0 rounded-lg shadow-lg flex w-[100%] h-full bg-slate-500 md:bg-white outline-none focus:outline-none">
        <p
          className="absolute right-5 top-3 text-3xl text-slate-700 cursor-pointer"
          onClick={() => navigate("/")}
        >
          x
        </p>
        <LoginBanner />
        <div className="md:w-[50%] w-[100%] max-h-[100vh] overflow-y-auto py-8 flex gap-8 flex-col px-8">
          <p className="md:hidden block">
            <Logo />
          </p>
          <div>
            <h2 className="font-bold mb-3 text-2xl">Register</h2>
            <p className="text-sm italic text-slate-400">
              Please input all fields before clicking the register button
            </p>
          </div>
          <div className="flex flex-col gap-3 lg:w-[80%]">
            <label htmlFor="username" className="font-bold text-lg">
              Username (Minimum 4 Letters):
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              minLength={4}
              required
              className="bg-slate-200 p-2 text-black font-semibold"
            />

            <label htmlFor="password" className="font-bold text-lg">
              Password:{" "}
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => handlePasswordChange(e.target.value)}
              minLength={8}
              required
              className="bg-slate-200 p-2 text-black font-semibold"
            />

            {passwordError && (
              <p className="text-sm text-red-400 italic">
                Password must be at least 8 characters long and contain at least
                one number, one special character, and no spaces
              </p>
            )}

            <label htmlFor="address" className="font-bold text-lg">
              Address:
            </label>
            <input
              type="text"
              placeholder="House No"
              value={houseNo}
              onChange={(e) => setHouseNo(e.target.value)}
              className="bg-slate-200 p-2 text-black font-semibold"
            />
            <input
              type="text"
              placeholder="Street"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              className="bg-slate-200 p-2 text-black font-semibold"
            />
            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="bg-slate-200 p-2 text-black font-semibold"
            />
            <input
              type="text"
              placeholder="State"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="bg-slate-200 p-2 text-black font-semibold"
            />
            <input
              type="text"
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="bg-slate-200 p-2 text-black font-semibold"
            />

            <label htmlFor="phoneNumber" className="font-bold text-lg">
              Phone Number:
            </label>
            <input
              type="tel"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter your phone number"
              pattern="^[0-9]{8,15}$" // Adjust the pattern according to your requirements
              required
              className="bg-slate-200 p-2 text-black font-semibold"
            />
          </div>

          <button
            className="p-4 bg-slate-900 md:w-[50%] text-white hover:opacity-50"
            onClick={handleRegister}
          >
            Register
          </button>
        </div>
      </div>
      <p className=" hidden md:block text-white absolute text-sm w-[50%] bottom-0 text-center p-6 bg-black">
        © 2024 11G Autos. All rights reserved.
      </p>
    </div>
  );
};

export default Register;