import SearchInput from "../../utils/search";

const banner1 = new URL("../../assets/banner/banner1.jpg", import.meta.url)
  .href;

const Banner = () => {
  return (
    <div
      style={{ backgroundImage: `url(${banner1})` }}
      className="bg-cover bg-center h-screen lg:h-[32rem] flex items-center justify-center flex-col gap-5"
    >
      {/* <h1>11G Autos</h1> */}
      <h2 className="text-white text-xl font-bold">
        Car Buying to Shape Your Life
      </h2>
      <div className="sm:hidden">
        <SearchInput />
      </div>
    </div>
  );
};

export default Banner;
