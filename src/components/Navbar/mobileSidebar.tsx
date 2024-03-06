import React from "react";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";

import Logo from "../../utils/logo";

interface MobileSidebarProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

const MobileSidebar: React.FC<MobileSidebarProps> = ({
  isMenuOpen,
  toggleMenu,
}) => {
  return (
    <div className="lg:hidden z-40" onClick={toggleMenu}>
      <div className="cursor-pointer">
        {!isMenuOpen && <FaBars size={25} />}
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 bg-white opacity-90">
          <div className="absolute cursor-pointer ease-in-out duration-1000 transform-translate-y-0 bg-gray-600 py-5 px-8 top-1 bottom-1 left-0 flex flex-col gap-8">
            <span className="mt-">
              <Logo />
            </span>
            <span
              className="text-white text-3xl right-1 -top-2 absolute"
              onClick={toggleMenu}
            >
              &times;
            </span>
            <div className="lg:hidden flex flex-col gap-8 text-sm text-white">
              <Link to="/">Home</Link>
              <Link to="/new-cars">Buy New Cars</Link>
              <Link to="/used-cars">Buy Used Cars</Link>
              <Link to="/sell-car">Sell Your Car</Link>
              <Link to="/car-ass">Buy Car Assesories</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileSidebar;
