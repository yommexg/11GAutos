import { Link } from "react-router-dom";
import { FaApple, FaGooglePlay } from "react-icons/fa";

import { socialLinks } from "./data";

const Footer2 = () => {
  return (
    <div className="flex flex-col items-center gap-8 my-5 md:flex-row md:justify-between md:px-24">
      <div className="flex gap-8 lg:gap-16">
        {socialLinks.map((item) => (
          <Link to={item?.link} key={item?.id} className="text-xl">
            {item?.icon}
          </Link>
        ))}
      </div>
      <div className="flex gap-3">
        <div className="flex items-center rounded-md gap-2 cursor-pointer border px-3 py-1 border-black hover:opacity-40">
          <FaApple size={30} />
          <div>
            <p className="text-[8px]">Availiable on the</p>
            <p className="font-semibold">App Store</p>
          </div>
        </div>
        <div className="flex items-center rounded-md gap-2 cursor-pointer border px-3 py-1 border-black hover:opacity-40">
          <FaGooglePlay size={25} />
          <div>
            <p className="text-[8px]">Get it on</p>
            <p className="font-semibold">Google play</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer2;
