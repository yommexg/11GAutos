import React from "react";
import { FaBars } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

import Logo from "../../utils/logo";

interface MobileSidebarProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  scrollToTop: () => void;
}

const MobileSidebar: React.FC<MobileSidebarProps> = ({
  isMenuOpen,
  toggleMenu,
  scrollToTop,
}) => {
  const location = useLocation();

  return (
    <div className="lg:hidden z-40" onClick={toggleMenu}>
      <div className="cursor-pointer">
        {!isMenuOpen && <FaBars size={25} />}
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 bg-white opacity-90">
          <div className="absolute cursor-pointer ease-in-out duration-1000 w-[200px] transform-translate-y-0 bg-gray-600 py-5 px-8 top-0 bottom-0 left-0 flex flex-col gap-8">
            <span>
              <Logo />
            </span>
            <span
              className="text-white text-3xl right-1 -top-2 absolute"
              onClick={toggleMenu}
            >
              &times;
            </span>
            <div className="lg:hidden flex flex-col gap-8 text-sm text-white">
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
          <p className="text-white absolute text-[9px] bottom-0 p-4 w-[200px] bg-black">
            © 2024 11G Autos. All rights reserved.
          </p>
        </div>
      )}
    </div>
  );
};

export default MobileSidebar;
