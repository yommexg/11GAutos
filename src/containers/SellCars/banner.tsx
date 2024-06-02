const sellBanner = new URL("../../assets/banner/sellCar.jpg", import.meta.url)
  .href;

const SellBanner: React.FC = () => {
  return (
    <div
      style={{ backgroundImage: `url(${sellBanner})` }}
      className="bg-cover md:bg-center h-[250px] sm:h-[25rem] flex items-center flex-col p-10"
    >
      <div className="absolute inset-0 bg-black opacity-70 flex flex-col items-center justify-center h-[330px] sm:h-[30rem] pt-36">
        <h2 className="text-white text-center font-extrabold text-2xl sm:text-3xl my-2 px-4">
          Upload and Sell Car At Convience
        </h2>
        <p className="text-white font-semi-bold md:text-xl text-center md:w-[300px] lg:w-[500px]">
          Get A Response from us within 24hrs
        </p>
      </div>
    </div>
  );
};

export default SellBanner;
