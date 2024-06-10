const Footer3 = () => {
  return (
    <>
      <div className="flex flex-col gap-5 md:gap-8 md:py-10 py-6 text-xs md:text-base px-6 md:px-24">
        <p className="text-center">
          For questions about the 11G Auto Buying Service please call
          <a
            href="tel:+2348169427948"
            className="font-bold cursor-pointer not-italic border-b ml-2 pb-[2px] border-black"
          >
            +2348169427948
          </a>
        </p>
        <p className="text-center">
          Certified Dealers are contractually obligated by 11G to meet certain
          customer service requirements and complete the 11G Dealer
          Certification Program.
        </p>
        <p className="text-center">
          11G does not broker, sell, or lease motor vehicles. Unless otherwise
          noted, all vehicles shown on this website are offered for sale by
          licensed motor vehicle dealers. All vehicles are subject to prior
          sale. By accessing this website, you agree to the 11G Terms of Service
          and Privacy Policy.
        </p>
        {/* <div className="flex items-center justify-center gap-5 text-gray-600">
          {PrivacyPolicy.map((item) => (
            <Link
              to={item?.link}
              key={item?.id}
              className="border-b border-b-black"
            >
              {item.name}
            </Link>
          ))}
        </div> */}
      </div>
      <p className="text-center italic my-5 text-sm font-semibold">
        © and ™ 11GAutos, Inc. All rights reserved.
      </p>
    </>
  );
};

export default Footer3;
