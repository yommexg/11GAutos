import Logo from "../../utils/logo";

const LoginBanner: React.FC = () => {
  return (
    <div className="md:w-[50%] hidden md:flex flex-col gap-8 pt-40 bg-slate-500 p-20">
      <Logo />
      <h2 className="text-white text-3xl font-bold italic">
        Welcome to 11G Autos!
      </h2>

      <p className="text-xs text-slate-300">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dignissimos
        cumque exercitationem quas laboriosam numquam harum reiciendis, ut
        temporibus earum esse perspiciatis error repellat hic labore atque
        minima laborum itaque odio?
      </p>
    </div>
  );
};

export default LoginBanner;
