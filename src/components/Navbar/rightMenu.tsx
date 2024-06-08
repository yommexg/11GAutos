import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaAngleDown } from "react-icons/fa";

import { RootState, useAppDispatch } from "../../redux/store";
import { User } from "../../../types";
import SignUpButton from "../../utils/signUp";
import { logoutAsync } from "../../redux/slice/logoutSlice";

const noAvatar = new URL("../../assets/noAvatar.png", import.meta.url).href;

interface RightMenuProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  scrollToTop: () => void;
}

const RightMenu: React.FC<RightMenuProps> = ({
  toggleMenu,
  scrollToTop,
  isMenuOpen,
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const loading = useSelector((state: RootState) => state.getUser.loading);

  const userData = useSelector(
    (state: RootState) => state.getUser.userData as User
  );

  const openMenu = () => {
    toggleMenu();
    document.body.style.overflow = "hidden";
  };

  const closeMenu = () => {
    toggleMenu();
    document.body.style.overflow = "";
  };

  const handleSignOut = async () => {
    closeMenu();

    await dispatch(
      logoutAsync({
        extra: {
          navigate,
        },
      })
    );
  };

  return (
    <>
      {Object.entries(userData)?.length === 0
        ? !loading && <SignUpButton />
        : !isMenuOpen && (
            <div
              className="cursor-pointer flex items-center gap-2"
              onClick={openMenu}
            >
              <img
                src={userData.avatar ? userData.avatar : noAvatar}
                alt={userData.username}
                className="h-10 w-10 rounded-full"
              />
              <p className="hidden text-sm lg:block">{userData.username}</p>
              <FaAngleDown />
            </div>
          )}
      {isMenuOpen && (
        <div className="z-50 fixed inset-0  bg-slate-400 opacity-95">
          <div className="absolute right-0 top-0 bottom:-0 min-w-[200px] md:min-w-[250px] px-4 bg-slate-900 shadow-2xl py-4 rounded-tl-lg rounded-bl-lg ">
            <div className="flex items-center gap-2 my-4">
              <img
                src={userData.avatar ? userData.avatar : noAvatar}
                alt={userData.username}
                className="h-10 w-10 rounded-full"
              />
              <div>
                <p className="text-slate-400 font-bold">{userData.username}</p>
                <p className="text-blue-600 font-bold text-[9px]">
                  {userData.email}
                </p>
              </div>
            </div>
            <p
              className="absolute top-0 right-3 font-bold text-2xl text-white cursor-pointer"
              onClick={closeMenu}
            >
              x
            </p>
            <div className="flex flex-col gap-4 my-5 text-white font-semibold ">
              <Link
                to="/settings"
                onClick={scrollToTop}
                className="hover:opacity-50"
              >
                View Profile
              </Link>
              {/* <Link
                to="/orders"
                className="hover:opacity-50"
                onClick={scrollToTop}
              >
                Your Orders
              </Link>
              <Link
                to="/settings"
                className="hover:opacity-50"
                onClick={scrollToTop}
              >
                Settings
              </Link> */}
            </div>

            <div className="text-center">
              <button
                onClick={handleSignOut}
                className="px-5 py-2 bg-black text-white font-semibold hover:opacity-70 hover:bg-slate-600"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RightMenu;
