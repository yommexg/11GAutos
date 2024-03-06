const banner1 = new URL("../../assets/banner/banner1.jpg", import.meta.url)
  .href;

const Banner = () => {
  return (
    <div
      style={{ backgroundImage: `url(${banner1})` }}
      className="bg-cover bg-center h-56 lg:h-[32rem] flex items-center justify-center"
    >
      <h2>Car Buying to Shape Your Life</h2>
    </div>
  );
};

export default Banner;
