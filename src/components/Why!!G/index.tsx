import { useState } from "react";

import { Why11GData } from "./data";

const Why11G = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => Math.max(0, prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(Why11GData.length - 1, prevIndex + 1)
    );
  };

  return (
    <div className="bg-black text-white flex flex-col items-center pt-20 pb-20 gap-20">
      <h1 className="text-4xl font-bold">Why 11G Autos ?</h1>
      <div className="md:flex md:gap-[7rem] lg:gap-[10rem] items-center hidden">
        {Why11GData.map((item, index) => (
          <div key={item?.title + index} className="flex flex-col items-center">
            <img src={item?.imgSrc} alt={item?.title} width={150} />
            <h2 className="text-xl mt-5">{item?.title}</h2>
            <p className="md:w-[10rem] lg:w-[15rem] text-center">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* mobile view */}
      <div className="md:hidden items-center">
        <div
          key={Why11GData[currentIndex]?.title + currentIndex}
          className="flex flex-col items-center relative"
        >
          <img
            src={Why11GData[currentIndex]?.imgSrc}
            alt={Why11GData[currentIndex]?.title}
            width={150}
          />
          <h2 className="text-xl mt-8">{Why11GData[currentIndex]?.title}</h2>
          <p className="text-center mt-3 w-[20rem]">
            {Why11GData[currentIndex]?.desc}
          </p>
        </div>
        <div className="flex justify-between mt-10">
          <button
            onClick={goToPrevious}
            disabled={currentIndex === 0}
            className={`text-3xl bg-white pt-[1px] pb-[7px] px-3 cursor-pointer ${
              currentIndex === 0 ? "text-gray-200" : "text-black"
            }`}
          >
            &lt;
          </button>
          <button
            onClick={goToNext}
            disabled={currentIndex === Why11GData.length - 1}
            className={`text-3xl bg-white pt-[1px] pb-[7px] px-3 cursor-pointer ${
              currentIndex === Why11GData.length - 1
                ? "text-gray-200"
                : "text-black"
            }`}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Why11G;
