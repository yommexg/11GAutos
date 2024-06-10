const banner1 = new URL("../../assets/banner/banner.jpg", import.meta.url).href;

const Banner = () => {
  return (
    <div
      style={{ backgroundImage: `url(${banner1})` }}
      className="bg-cover bg-center h-[65vh] sm:h-[35rem] flex items-center justify-center flex-col gap-10 text-white"
    >
      <h1 className="text-5xl font-bold">11G Autos</h1>
      <h2 className="text-xl md:text-2xl  px-4 font-semibold italic text-center">
        Discover, compare, and buy cars easily. Extensive listings, trusted
        sellers. Your car journey starts here!
      </h2>
    </div>
  );
};

export default Banner;
