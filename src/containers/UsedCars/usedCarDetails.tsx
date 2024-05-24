import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaWhatsapp } from "react-icons/fa";

import { RootState, useAppDispatch } from "../../redux/store";
import { UsedCar } from "../../../types";
import { getOneUsedCar } from "../../redux/slice/usedCarSlice";
import ImageSwitcher from "../../utils/imageSwitcher";
import { brands } from "../../utils/carBrands";

const UsedCarDetails = () => {
  const { usedCarId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (usedCarId) {
      dispatch(
        getOneUsedCar({
          usedCarId,
          extra: {
            navigate,
          },
        })
      );
    }
  }, [usedCarId, dispatch, navigate]);

  const usedCar = useSelector(
    (state: RootState) => state.usedCar.oneusedCarData as UsedCar
  );

  const usedCarBrand = brands.find((brand) => brand.brand === usedCar.carBrand);

  const formattedPrice = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(usedCar?.price);

  return (
    <div className="my-4 mx-3 p-4 bg-gray-200">
      <div className="flex items-center justify-between">
        <FaArrowLeft
          onClick={() => navigate("/used-cars")}
          className="hover:opacity-60"
        />
        <h2 className="text-xl font-bold text-center">
          {usedCar.carName}{" "}
          <small
            className="block font-thin text-xs italic -mt-1"
            style={{
              color:
                usedCar?.carColor === "white" ? "black" : usedCar?.carColor,
            }}
          >
            {usedCar.carColor}
          </small>
        </h2>

        <div className="flex flex-col items-center gap-1 md:gap-3 cursor-pointer hover:opacity-45">
          <a
            href={`https://wa.me/+2348153192058?text=${encodeURIComponent(
              `Hello! I saw this ${usedCar.carName} on your website. I want to make more enquiries about the car`
            )}`}
          >
            <FaWhatsapp color="green" size={25} />
          </a>
        </div>
      </div>
      <ImageSwitcher images={usedCar.carImage} name={usedCar.carName} />

      <div className="bg-white shadow-xlmm mt-10 rounded-xl p-4">
        <div className="flex flex-col gap-2 justify-between my-5 mx-4 md:mx-10">
          <p className="text-lg text-blue-600 font-bold italic">
            {formattedPrice}
          </p>
          <p className="italic text-slate-500">
            Discount:{" "}
            <span className="text-[#1B1B1B] not-italic font-bold">
              {usedCar.discount}%
            </span>
          </p>

          <p className="italic text-slate-500">
            {" "}
            Quantity Availiable:{" "}
            <span className="text-[#1B1B1B] not-italic font-bold">
              {usedCar.quantity}
            </span>
          </p>
        </div>

        <div className="flex items-center justify-center mt-4 gap-2">
          <img
            src={usedCarBrand?.logo}
            alt={`${usedCarBrand?.brand} Logo`}
            className="w-6 h-6 md:w-8 md:h-8 rounded-full"
          />
          {usedCarBrand?.brand}
        </div>
        <div className="flex justify-between mx-4 mt-4">
          <p className="italic text-slate-500">
            {" "}
            Year:{" "}
            <span className="text-[#1B1B1B] not-italic font-bold">
              {usedCar.year}
            </span>
          </p>
          <p className="italic text-slate-500">
            {" "}
            Engine Type:{" "}
            <span className="text-[#1B1B1B] not-italic font-bold">
              {usedCar.engineType}
            </span>
          </p>
        </div>
        <div className="flex justify-between mx-4 mt-4 gap-8">
          <p className="italic text-slate-500">
            Power Source:{" "}
            <span className="text-[#1B1B1B] not-italic font-bold">
              {usedCar.energyType}
            </span>
          </p>
          <p className="italic text-slate-500">
            {" "}
            Gear Type:{" "}
            <span className="text-[#1B1B1B] not-italic font-bold">
              {usedCar.gearType}
            </span>
          </p>
        </div>
        <p className="italic text-slate-500 text-center mt-4">
          {" "}
          Engine Number:{" "}
          <span className="text-[#1B1B1B] not-italic font-bold ml-2">
            {usedCar.engineNumber}
          </span>
        </p>

        <p className="italic text-slate-500 text-center mt-4">
          {" "}
          Description:{" "}
          <span className="text-[#1B1B1B] block font-bold not-italic ml-2">
            {usedCar.description}
          </span>
        </p>
      </div>
    </div>
  );
};

export default UsedCarDetails;
