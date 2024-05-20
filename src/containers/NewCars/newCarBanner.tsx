const newCarBanner = new URL("../../assets/banner/newCar.jpg", import.meta.url)
  .href;

const NewCarBanner: React.FC = () => {
  return (
    <div
      style={{ backgroundImage: `url(${newCarBanner})` }}
      className="bg-cover md:bg-center h-[500px] sm:h-[35rem] flex items-center md:justify-end flex-col md:flex-row p-10"
    >
      <div>
        <h2 className="text-white text-center font-extrabold text-3xl mb-4">
          New Cars
        </h2>
        <p className="text-white font-semi-bold md:text-xl text-center md:w-[300px] lg:w-[500px]">
          Check out different types of new cars at 11G Autos, like sedans and
          SUVs, to find what suits you best.
        </p>
      </div>
    </div>
  );
};

export default NewCarBanner;
