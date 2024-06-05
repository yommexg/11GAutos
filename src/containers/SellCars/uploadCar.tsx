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
      {!userId || Object.entries(userData).length === 0 ? (
        <div className="flex flex-col items-center gap-8 p-20">
          <h2 className="italic text-lg font-semibold text-blue-500 lg:text-2xl text-center">
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
      ) : (
        <>
          {accessToken && userId && userData.status === 1 && (
            <NonSeller accessToken={accessToken} userId={userId} />
          )}
          {accessToken && userId && userData.status === 3 && (
            <div className="text-center px-4 py-32 flex flex-col gap-5">
              <p className="text-blue-600 font-semibold text-lg md:text-3xl">
                Your request to become a car seller is under review...
              </p>
              <p className="text-sm md:text-lg italic">
                Please Check back on or before 24hrs. If there is no reaponse
                within the time frame, <br />
                Contact us at{" "}
                <a
                  href="tel:+2348153182058"
                  className="font-bold cursor-pointer not-italic px-2"
                >
                  +2348153182058
                </a>
              </p>
            </div>
          )}
          {accessToken && userId && userData.status === 2 && (
            <Seller userId={userId} />
          )}
        </>
      )}
    </div>
  );
};

export default UploadCar;
