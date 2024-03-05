import { Link } from "react-router-dom";
import { useState } from "react";

import Logo from "../../utils/logo";
import SearchInput from "../../utils/search";
import SignUpButton from "../../utils/signUp";
import MobileSidebar from "./mobileSidebar";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-200 px-4 lg:px-32 py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex gap-5 lg:gap-12 items-center">
          <MobileSidebar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
          {!isMenuOpen && <Logo />}
          <div className="hidden lg:flex flex-row gap-5 text-sm">
            <Link to="/new-cars">Buy New Cars</Link>
            <Link to="/used-cars">Buy Used Cars</Link>
            <Link to="/sell-car">Sell Your Car</Link>
            <Link to="/car-ass">Buy Car Assesories</Link>
          </div>
        </div>
        <div className="lg:flex items-center gap-5 ">
          <div className="hidden lg:block">
            <SearchInput />
          </div>
          <SignUpButton />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
