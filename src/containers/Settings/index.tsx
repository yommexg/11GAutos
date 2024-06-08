import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Logout from "./logout";
import ProfileData from "./profileData";
import ProfilePic from "./profilepic";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  UserInfo?: {
    _id: string;
  };
}

const Settings: React.FC = () => {
  const accessToken: string | null = localStorage.getItem("accessToken");

  const decodedToken: JwtPayload | null = accessToken
    ? jwtDecode<JwtPayload>(accessToken)
    : null;

  const userId: string | undefined = decodedToken?.UserInfo?._id;

  return (
    <div>
      <Navbar />
      <div className="flex flex-col justify-center">
        {userId && (
          <>
            <div className="overflow-y-auto h-[80vh] md:h-[90vh]">
              <ProfilePic />
              <ProfileData />
            </div>
            <Logout />
          </>
        )}
        {!userId && (
          <Link to="/" className="text-center h-[70vh] place-content-center ">
            <p className="bg-[#1B1B1B] mx-6 py-6 text-white">
              {" "}
              Go to Home Page
            </p>{" "}
          </Link>
        )}
      </div>
    </div>
  );
};

export default Settings;
