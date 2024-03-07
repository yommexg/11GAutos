import { Link } from "react-router-dom";
import SearchInput from "../../utils/search";

const banner1 = new URL("../../assets/banner/banner.jpg", import.meta.url).href;

const Banner = () => {
  return (
    <div
      style={{ backgroundImage: `url(${banner1})` }}
      className="bg-cover bg-center h-screen sm:h-[35rem] flex items-center justify-center flex-col gap-10 text-white mt-[75px]"
    >
      <h1 className="text-5xl font-bold">11G Autos</h1>
      <h2 className="text-xl font-semibold italic">
        Car Buying to Shape Your Life
      </h2>
      <div className="gap-7 flex text-sm">
        <Link
          className="hover:opacity-60 active:opcity-30 border-b pb-3 hover:border-gray-400 active:border-gray-600"
          to="/new-cars"
        >
          Shop New
        </Link>
        <Link
          className="hover:opacity-60 active:opcity-30  border-b pb-3 hover:border-gray-400 active:border-gray-600"
          to="/used-cars"
        >
          Shop Used
        </Link>
        <Link
          className="hover:opacity-60 active:opcity-30  border-b pb-3 hover:border-gray-400 active:border-gray-600"
          to="/car-ass"
        >
          Shop Assesories
        </Link>
      </div>
      <div className="sm:hidden">
        <SearchInput />
      </div>
    </div>
  );
};

export default Banner;
