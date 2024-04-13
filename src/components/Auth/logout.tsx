import LoginBanner from "./loginBanner";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { RootState } from "../../redux/store";
import Logo from "../../utils/logo";
import Spinner from "../Spinner";

const Logout: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = async () => {
    navigate("/login");
  };

  const loading = useSelector((state: RootState) => state.getUser.loading);

  return (
    <div className="fixed z-50 right-0 top-0 left-0 bottom-0 outline-none focus:outline-none">
      <div className="border-0 rounded-lg shadow-lg flex w-[100%] h-full bg-slate-500 md:bg-white outline-none focus:outline-none">
        {loading && <Spinner />}

        <LoginBanner />
        <div className="md:w-[50%] w-[100%] lg:pl-32 flex gap-8 flex-col justify-center px-8">
          <p className="md:hidden block">
            <Logo />
          </p>
          <div>
            <h2 className="font-bold mb-3 text-3xl">LOGGED OUT</h2>
            <p className="text-xs italic text-slate-400">
              Thank You, You have been sucessfully logged out of 11GAutos
            </p>
            <button
              onClick={handleSubmit}
              className="mt-5 bg-black text-white px-4 py-3"
            >
              Click Here to Login Again
            </button>
          </div>
        </div>
      </div>
      <p className=" hidden md:block text-white absolute text-sm w-[50%] bottom-0 text-center p-6 bg-black">
        © 2024 11G Autos. All rights reserved.
      </p>
    </div>
  );
};

export default Logout;
