import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaWhatsapp } from "react-icons/fa";

import { RootState, useAppDispatch } from "../../redux/store";
import { UsedCar } from "../../../types";
import { getOneUsedCar } from "../../redux/slice/usedCarSlice";
import ImageSwitcher from "../../utils/imageSwitcher";
import { brands } from "../../utils/carBrands";

const UsedCarDetails: React.FC = () => {
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
    (state: RootState) => state.usedCar.oneUsedCarData as UsedCar
  );

  const usedCarBrand = brands.find((brand) => brand.brand === usedCar.carBrand);

  const address = usedCar?.carLocation;

  const formattedPrice = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(usedCar?.price);

  return (
    <div className="my-4 mx-3 p-4 bg-gray-200">
      <div className="flex items-center justify-between">
        <FaArrowLeft
          onClick={() => navigate("/used-cars")}
          className="hover:opacity-60 cursor-pointer"
          size={25}
        />
        <h2 className="text-xl font-bold text-center">
          {usedCar.carName}
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

      <div className="bg-white flex flex-col md:flex-row gap-10 md:gap-[300px] md:justify-center px-10 md:px-40 py-10 shadow-xl mt-10 rounded-xl">
        <div className=" flex flex-col gap-4">
          <p className="text-lg text-blue-600 font-bold italic">
            {formattedPrice}
          </p>
          <p className="italic text-slate-500">
            Discount:
            <span className="text-[#1B1B1B] ml-2 not-italic font-bold">
              {usedCar.discount}%
            </span>
          </p>

          <p className="italic text-slate-500">
            Quantity Availiable:
            <span className="text-[#1B1B1B] ml-2 not-italic font-bold">
              {usedCar.quantity}
            </span>
          </p>

          <div className="flex items-center gap-2">
            <img
              src={usedCarBrand?.logo}
              alt={`${usedCarBrand?.brand} Logo`}
              className="w-6 h-6 md:w-8 md:h-8 rounded-full"
            />
            {usedCarBrand?.brand}
          </div>

          <p className="italic text-slate-500">
            Year:
            <span className="text-[#1B1B1B] ml-2 not-italic font-bold">
              {usedCar.year}
            </span>
          </p>
          <p className="italic text-slate-500">
            Engine Type:
            <span className="text-[#1B1B1B] ml-2 not-italic font-bold">
              {usedCar.engineType}
            </span>
          </p>

          <p className="italic text-slate-500">
            Power Source:
            <span className="text-[#1B1B1B] ml-2 not-italic font-bold">
              {usedCar.energyType}
            </span>
          </p>
          <p className="italic text-slate-500">
            Gear Type:
            <span className="text-[#1B1B1B] ml-2 not-italic font-bold">
              {usedCar.gearType}
            </span>
          </p>

          <p className="italic text-slate-500">
            Engine Number:
            <span className="text-[#1B1B1B] ml-2 not-italic font-bold">
              {usedCar.engineNumber}
            </span>
          </p>

          <p className="italic text-slate-500">
            Description:
            <span className="text-[#1B1B1B] block font-bold not-italic ml-2">
              {usedCar.description}
            </span>
          </p>
        </div>
        <div>
          <h2 className="text-center text-lg font-bold mb-4">Car Location</h2>
          <div className="flex flex-col gap-4 text-xs md:text-base">
            <p>
              Bus Stop / Land Mark:
              <span className="font-bold text-lg capitalize text-blue-500 ml-2">
                {address?.busStop}
              </span>
            </p>
            <p>
              City:
              <span className="text-blue-500 font-bold text-lg capitalize ml-2 ">
                {address?.city}
              </span>
            </p>
            <p>
              State:
              <span className="font-bold text-lg capitalize ml-2 text-blue-500">
                {address?.state}
              </span>
            </p>
            <p>
              Country:
              <span className="font-bold text-lg capitalize ml-2 text-blue-500">
                {address?.country}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsedCarDetails;
