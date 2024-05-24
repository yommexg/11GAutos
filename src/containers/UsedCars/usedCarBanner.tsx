const usedCarBanner = new URL(
  "../../assets/banner/usedCar.jpg",
  import.meta.url
).href;

const UsedCarBanner: React.FC = () => {
  return (
    <div
      style={{ backgroundImage: `url(${usedCarBanner})` }}
      className="bg-cover md:bg-center h-[500px] sm:h-[35rem] flex items-center md:justify-end flex-col md:flex-row p-10"
    >
      <div className=" md:hidden">
        <h2 className="text-white text-center font-extrabold text-3xl mb-4">
          Best Sales Deals on Used Cars
        </h2>
      </div>
    </div>
  );
};

export default UsedCarBanner;
