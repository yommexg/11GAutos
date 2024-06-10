import { Link } from "react-router-dom";

const sellBanner = new URL(
  "../../assets/banner/sellBanner.jpg",
  import.meta.url
).href;

const SellCarBanner = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="p-10 flex flex-col gap-5 items-center">
      <h2 className="text-5xl font-bold">Sell your car</h2>
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-20 p-5 items-center">
        <i>
          <p className="lg:text-xl">
            Embrace a seamless transition with 11g Autos as you sell your ride.
            Our platform offers a curated selection of quality used cars,
            ensuring a blend of style, comfort, and performance. Trust us to
            redefine your journey, delivering an unparalleled experience that
            turns every transaction into a celebration of automotive excellence.
          </p>
        </i>
        <img
          src={sellBanner}
          alt="Sell banner"
          className="w-[400px] rounded-lg lg:w-[40%]"
        />
      </div>
      <Link
        onClick={scrollToTop}
        to="/sell-car"
        className="p-4 bg-black text-white rounded-lg hover:opacity-65 px-8"
      >
        Get started
      </Link>
    </div>
  );
};

export default SellCarBanner;
