import { Link } from "react-router-dom";

import { Products, Resources, About, WorkWith11GAutos } from "./data";

const Footer1 = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center md:items-start md:justify-start mt-5 p-6 pb-8 gap-6 md:px-24 ">
      <div className="border-b-2 pb-6 w-[100%] border-black md:border-b-0 md:pb-0">
        <h2 className="text-2xl mb-4 md:mb-6 text-center md:text-xl md:text-left font-bold">
          Products
        </h2>
        <div className="flex flex-col gap-3">
          {Products.map((item) => (
            <Link
              key={item?.id}
              to={item?.link}
              className="text-sm md:text-base text-center md:text-left italic hover:text-blue-400"
              onClick={scrollToTop}
            >
              {item?.name}
            </Link>
          ))}
        </div>
      </div>
      <div className="border-b-2 pb-6 w-[100%] border-black md:border-b-0 md:pb-0">
        <h2 className="text-2xl mb-4 md:mb-6 text-center md:text-xl font-bold">
          Resources
        </h2>
        <div className="flex flex-col gap-3">
          {Resources.map((item) => (
            <Link
              key={item?.id}
              to={item?.link}
              onClick={scrollToTop}
              className="text-sm md:text-base text-center italic hover:text-blue-400"
            >
              {item?.name}
            </Link>
          ))}
        </div>
      </div>
      <div className="border-b-2 pb-6 w-[100%] border-black md:border-b-0 md:pb-0">
        <h2 className="text-2xl mb-4 md:mb-6 text-center md:text-xl font-bold">
          Work With 11G Autos
        </h2>
        <div className="flex flex-col gap-3">
          {WorkWith11GAutos.map((item) => (
            <Link
              key={item?.id}
              to={item?.link}
              onClick={scrollToTop}
              className="text-sm md:text-base text-center italic hover:text-blue-400"
            >
              {item?.name}
            </Link>
          ))}
        </div>
      </div>
      <div className="w-[100%]">
        <h2 className="text-2xl mb-4 md:mb-6 text-center md:text-xl md:text-right font-bold">
          About
        </h2>
        <div className="flex flex-col gap-5">
          {About.map((item) => (
            <Link
              key={item?.id}
              to={item?.link}
              onClick={scrollToTop}
              className="text-sm md:text-base text-center md:text-right italic hover:text-blue-400"
            >
              {item?.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer1;
