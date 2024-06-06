const carAssBanner = new URL("../../assets/banner/carass.jpg", import.meta.url)
  .href;

const CarAssBanner: React.FC = () => {
  return (
    <div
      style={{ backgroundImage: `url(${carAssBanner})` }}
      className="bg-cover md:bg-center h-[250px] sm:h-[25rem] flex items-center flex-col p-10"
    >
      <div className="absolute inset-0 bg-black opacity-80 flex flex-col items-center justify-center h-[330px] sm:h-[30rem]">
        <h2 className="text-white text-center font-extrabold text-2xl sm:text-3xl my-10 px-4">
          Explore Different Car Assesories on our Website
        </h2>
        <p className="text-white text-xs  font-semi-bold md:text-xl text-center mx-6 md:mx-16">
          Spruce up your ride from bumper to headlights! 11G Autos has
          everything to elevate your driving experience. Explore our vast
          selection of car accessories – from batteries to dazzling upgrades –
          all at unbeatable prices.
        </p>
      </div>
    </div>
  );
};

export default CarAssBanner;
