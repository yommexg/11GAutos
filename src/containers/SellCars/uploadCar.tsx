import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { scrollToTop } from "../../utils/scrollToTop";
import { User } from "../../../types";
import { RootState } from "../../redux/store";
import NonSeller from "./nonSeller";
import Seller from "./seller";

interface JwtPayload {
  UserInfo?: {
    _id: string;
  };
}

const UploadCar = () => {
  const accessToken: string | null = localStorage.getItem("accessToken");
  const decodedToken: JwtPayload | null = accessToken
    ? jwtDecode<JwtPayload>(accessToken)
    : null;
  const userId: string | undefined = decodedToken?.UserInfo?._id;

  const userData = useSelector(
    (state: RootState) => state.getUser.userData as User
  );

  return (
    <div>
      {!userId && (
        <div className="flex flex-col items-center gap-8 p-20">
          <h2 className="italic text-lg font-semibold text-blue-500 lg:text-2xl">
            Login to view full Experience
          </h2>
          <Link
            onClick={scrollToTop}
            to="/login"
            className="p-4 bg-black text-white rounded-lg hover:opacity-65 px-8"
          >
            Continue
          </Link>
        </div>
      )}
      {userId && userData.status === 1 && <NonSeller />}
      {userId && userData.status === 2 && <Seller />}
    </div>
  );
};

export default UploadCar;
