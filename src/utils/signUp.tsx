import { ChangeEvent, useState } from "react";

import Logo from "./logo";

const SignUpButton = () => {
  const [showModal, setShowModal] = useState(false);

  const handleSignIn = () => {
    setShowModal(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setShowModal(false);
    document.body.style.overflow = "";
  };

  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(true);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setEmail(value);
    setIsValid(validateEmail(value));
  };

  const validateEmail = (email: string): boolean => {
    // Regular expression for email validation
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  return (
    <div>
      <button
        className="bg-black hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-gray-300"
        onClick={handleSignIn}
      >
        Sign In
      </button>

      {showModal && (
        <div className="fixed z-50 right-0 top-0 left-0 bottom-0 outline-none focus:outline-none">
          <div className="border-0 rounded-lg shadow-lg flex w-[100%] h-full bg-slate-500 md:bg-white outline-none focus:outline-none">
            <p
              className="absolute top-5 right-5 text-2xl text-white md:text-slate-700 cursor-pointer"
              onClick={closeModal}
            >
              x
            </p>
            <div className="md:w-[50%] hidden md:flex flex-col gap-8 pt-24 bg-slate-500 p-20">
              <Logo />
              <div>
                <h2 className="text-white text-3xl font-bold italic">Hello</h2>
                <h2 className="text-white text-3xl font-bold italic">
                  Welcome to 11G Autos!
                </h2>
              </div>
              <p className="text-xs text-slate-300">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Dignissimos cumque exercitationem quas laboriosam numquam harum
                reiciendis, ut temporibus earum esse perspiciatis error repellat
                hic labore atque minima laborum itaque odio?
              </p>
            </div>
            <div className="md:w-[50%] w-[100%] flex gap-8 flex-col justify-center px-8">
              <p className="md:hidden block">
                <Logo />
              </p>
              <div>
                <h2 className="font-bold mb-1 text-lg">
                  Verify Email Address to Create Account
                </h2>
                <p className="text-xs italic text-slate-400">
                  Enter a valid Email Address
                </p>
              </div>
              <div className="flex flex-col gap-3 lg:w-[50%] ">
                <label htmlFor="email">Email Address:</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={handleChange}
                  className=" bg-slate-200 p-2 text-black font-semibold"
                />
                {!isValid && (
                  <p style={{ color: "red" }}>
                    Please enter a valid email address.
                  </p>
                )}
              </div>

              <button className="p-4 bg-slate-900 text-white hover:opacity-50">
                Verify Now
              </button>
            </div>
          </div>
          <p className=" hidden md:block text-white absolute text-sm w-[50%] bottom-0 text-center p-6 bg-black">
            © 2024 11G Autos. All rights reserved.
          </p>
        </div>
      )}
    </div>
  );
};

export default SignUpButton;
