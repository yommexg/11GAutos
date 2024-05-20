import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Logo from "../../utils/logo";
import LoginBanner from "./loginBanner";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import { registerUser } from "../../redux/slice/registerSlice";
import { Address } from "../../../types";
import Spinner from "../Spinner";
import { scrollToTop } from "../../utils/scrollToTop";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const email = (location.state as { email: string }).email;

  const loading = useSelector((state: RootState) => state.register.loading);

  const [username, setUsername] = useState("");
  const [usernameTouched, setUsernameTouched] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [houseNo, setHouseNo] = useState("");
  const [houseNoTouched, setHouseNoTouched] = useState(false);
  const [street, setStreet] = useState("");
  const [streetTouched, setStreetTouched] = useState(false);
  const [city, setCity] = useState("");
  const [cityTouched, setCityTouched] = useState(false);
  const [state, setState] = useState("");
  const [stateTouched, setStateTouched] = useState(false);
  const [country, setCountry] = useState("");
  const [countryTouched, setCountryTouched] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberTouched, setPhoneNumberTouched] = useState(false);

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

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleRegister = async () => {
    if (
      !username ||
      !password ||
      !houseNo ||
      !street ||
      !city ||
      !state ||
      !country ||
      !phoneNumber
    ) {
      setUsernameTouched(true);
      setPasswordTouched(true);
      setHouseNoTouched(true);
      setStreetTouched(true);
      setCityTouched(true);
      setStateTouched(true);
      setCountryTouched(true);
      setPhoneNumberTouched(true);

      toast.error("Please Input All fielda");
    } else if (passwordError) {
      toast.error(passwordError);
    } else {
      const address: Address = {
        city,
        country,
        houseNo,
        state,
        street,
      };

      await dispatch(
        registerUser({
          pwd: password,
          userData: {
            address,
            email,
            phoneNumber,
            username,
          },
          extra: {
            navigate,
          },
        })
      );
    }
  };

  return (
    <div className="fixed z-50 right-0 top-0 inset-0 left-0 bottom-0 outline-none focus:outline-none">
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
        <div className="md:w-[50%] w-[100%] max-h-[100vh] overflow-y-auto py-8 flex gap-8 flex-col px-8">
          <div className="md:hidden block">
            <Logo />
          </div>
          <div>
            <h2 className="font-bold mb-3 text-2xl">Register</h2>
            <p className="text-sm italic text-slate-400">
              Please input all fields before clicking the register button
            </p>
          </div>
          <div className="flex flex-col gap-3 lg:w-[80%]">
            <label htmlFor="username" className="font-bold text-lg">
              Username:
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onBlur={() => setUsernameTouched(true)}
              minLength={4}
              required
              className={`bg-slate-200 p-2 text-black font-semibold ${
                usernameTouched && !username ? "border border-red-500" : ""
              }`}
            />
            {/* Conditional rendering for red flag */}
            {usernameTouched && !username && (
              <p className="text-sm text-red-500 italic">
                Please enter a username.
              </p>
            )}

            <label htmlFor="password" className="font-bold text-lg">
              Password:
            </label>
            <div className="relative">
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => handlePasswordChange(e.target.value)}
                onBlur={() => setPasswordTouched(true)}
                minLength={8}
                required
                className={`bg-slate-200 w-full p-2 text-black font-semibold ${
                  passwordTouched && !password ? "border border-red-500" : ""
                }`}
              />
              <button
                className="absolute right-2 top-3 text-sm"
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? "Hide" : "Show"}
              </button>
            </div>
            {passwordTouched && !password && (
              <p className="text-sm text-red-500 italic">
                Please enter a password.
              </p>
            )}
            {passwordError && (
              <p className="text-sm text-red-500 italic">{passwordError}</p>
            )}

            <label htmlFor="address" className="font-bold text-lg">
              Address:
            </label>
            <input
              type="text"
              placeholder="House No"
              value={houseNo}
              onChange={(e) => setHouseNo(e.target.value)}
              onBlur={() => setHouseNoTouched(true)}
              className={`bg-slate-200 p-2 text-black font-semibold ${
                houseNoTouched && !houseNo ? "border border-red-500" : ""
              }`}
            />
            {houseNoTouched && !houseNo && (
              <p className="text-sm text-red-500 italic">
                Please enter a house number.
              </p>
            )}

            <input
              type="text"
              placeholder="Street"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              onBlur={() => setStreetTouched(true)}
              className={`bg-slate-200 p-2 text-black font-semibold ${
                streetTouched && !street ? "border border-red-500" : ""
              }`}
            />
            {streetTouched && !street && (
              <p className="text-sm text-red-500 italic">
                Please enter a street.
              </p>
            )}

            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onBlur={() => setCityTouched(true)}
              className={`bg-slate-200 p-2 text-black font-semibold ${
                cityTouched && !city ? "border border-red-500" : ""
              }`}
            />
            {cityTouched && !city && (
              <p className="text-sm text-red-500 italic">
                Please enter a city.
              </p>
            )}

            <input
              type="text"
              placeholder="State"
              value={state}
              onChange={(e) => setState(e.target.value)}
              onBlur={() => setStateTouched(true)}
              className={`bg-slate-200 p-2 text-black font-semibold ${
                stateTouched && !state ? "border border-red-500" : ""
              }`}
            />
            {stateTouched && !state && (
              <p className="text-sm text-red-500 italic">
                Please enter a state.
              </p>
            )}

            <input
              type="text"
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              onBlur={() => setCountryTouched(true)}
              className={`bg-slate-200 p-2 text-black font-semibold ${
                countryTouched && !country ? "border border-red-500" : ""
              }`}
            />
            {countryTouched && !country && (
              <p className="text-sm text-red-500 italic">
                Please enter a country.
              </p>
            )}

            <label htmlFor="phoneNumber" className="font-bold text-lg">
              Phone Number:
            </label>
            <input
              type="tel"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              onBlur={() => setPhoneNumberTouched(true)}
              placeholder="Enter your phone number"
              pattern="^[0-9]{8,15}$" // Adjust the pattern according to your requirements
              required
              className={`bg-slate-200 p-2 text-black font-semibold ${
                phoneNumberTouched && !phoneNumber
                  ? "border border-red-500"
                  : ""
              }`}
            />
            {phoneNumberTouched && !phoneNumber && (
              <p className="text-sm text-red-500 italic">
                Please enter a phone number.
              </p>
            )}
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
