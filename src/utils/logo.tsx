const logoImage = new URL("../assets/11GLogo.png", import.meta.url).href;
const logoName = new URL("../assets/11GName.png", import.meta.url).href;

const Logo = () => {
  return (
    <div className="flex items-center gap-3">
      <img src={logoImage} alt="lOGO" width={35} />
      <img src={logoName} alt="lOGO" width={75} />
    </div>
  );
};

export default Logo;
