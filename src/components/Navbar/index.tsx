import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

import Logo from "../../utils/logo";
import SearchInput from "../../utils/search";
import MobileSidebar from "./mobileSidebar";
import RightMenu from "./rightMenu";

const Navbar: React.FC = () => {
  const [isLeftMenuOpen, setIsLeftMenuOpen] = useState(false);
  const [isRightMenuOpen, setIsRightMenuOpen] = useState(false);

  const location = useLocation();

  const toggleLeftMenu = () => {
    setIsLeftMenuOpen(!isLeftMenuOpen);
  };

  const toggleRightMenu = () => {
    setIsRightMenuOpen(!isRightMenuOpen);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const mobileScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    toggleLeftMenu();
    document.body.style.overflow = "";
  };

  const rightMenuScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    toggleRightMenu();
    document.body.style.overflow = "";
  };

  return (
    <nav className="bg-gray-200 z-10 px-4 lg:px-32 py-4 shadow-md h-18 fixed top-0 right-0 left-0">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex gap-5 lg:gap-12 items-center">
          <MobileSidebar
            isMenuOpen={isLeftMenuOpen}
            toggleMenu={toggleLeftMenu}
            scrollToTop={mobileScrollToTop}
          />
          {!isLeftMenuOpen && <Logo />}
          <div className="hidden lg:flex flex-row gap-5 text-sm">
            <Link
              to="/"
              className={`hover:opacity-60 ${
                location.pathname === "/" ? "text-blue-300" : ""
              }`}
              onClick={scrollToTop}
            >
              Home
            </Link>
            <Link
              to="/new-cars"
              className={`hover:opacity-60 ${
                location.pathname === "/new-cars" ? "text-blue-300" : ""
              }`}
              onClick={scrollToTop}
            >
              Buy New Cars
            </Link>
            <Link
              to="/used-cars"
              className={`hover:opacity-60 ${
                location.pathname === "/used-cars" ? "text-blue-300" : ""
              }`}
              onClick={scrollToTop}
            >
              Buy Used Cars
            </Link>
            <Link
              to="/sell-car"
              className={`hover:opacity-60 ${
                location.pathname === "/sell-car" ? "text-blue-300" : ""
              }`}
              onClick={scrollToTop}
            >
              Sell Your Car
            </Link>
            <Link
              to="/car-ass"
              className={`hover:opacity-60 ${
                location.pathname === "/car-ass" ? "text-blue-300" : ""
              }`}
              onClick={scrollToTop}
            >
              Buy Car Accessories
            </Link>
          </div>
        </div>
        <div className="sm:flex flex-row items-center gap-5 ">
          <div
            className={`hidden sm:block ${isRightMenuOpen ? "mr-40" : "mr-10"}`}
          >
            <SearchInput />
          </div>
          <RightMenu
            isMenuOpen={isRightMenuOpen}
            scrollToTop={rightMenuScrollToTop}
            toggleMenu={toggleRightMenu}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
