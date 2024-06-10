import Logo from "../../utils/logo";

const LoginBanner: React.FC = () => {
  return (
    <div className="md:w-[50%] hidden md:flex flex-col gap-8 pt-40 bg-slate-500 p-20">
      <Logo />
      <h2 className="text-white text-3xl font-bold italic">
        Welcome to 11G Autos!
      </h2>

      <p className="text-lg text-slate-300">
        Explore a vast selection of new and used cars on our dynamic platform.
        Browse through top brands, compare prices, and connect with trusted
        sellers effortlessly. With intuitive search filters and comprehensive
        vehicle details, finding your dream car has never been easier. Start
        your car-buying journey today
      </p>
    </div>
  );
};

export default LoginBanner;
