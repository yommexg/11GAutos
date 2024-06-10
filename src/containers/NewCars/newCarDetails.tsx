import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaWhatsapp } from "react-icons/fa";

import { RootState, useAppDispatch } from "../../redux/store";
import { NewCar } from "../../../types";
import { getOneNewCar } from "../../redux/slice/newCarSlice";
import ImageSwitcher from "../../utils/imageSwitcher";
import { brands } from "../../utils/carBrands";

const NewCarDetails = () => {
  const { newCarId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (newCarId) {
      dispatch(
        getOneNewCar({
          newCarId,
          extra: {
            navigate,
          },
        })
      );
    }
  }, [newCarId, dispatch, navigate]);

  const newCar = useSelector(
    (state: RootState) => state.newCar.oneNewCarData as NewCar
  );

  const newCarBrand = brands.find((brand) => brand.brand === newCar.carBrand);

  const formattedPrice = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(newCar?.price);

  return (
    <div className="my-4 mx-3 p-4 bg-gray-200">
      <div className="flex items-center justify-between">
        <FaArrowLeft
          onClick={() => navigate("/new-cars")}
          className="hover:opacity-60 cursor-pointer"
          size={25}
        />
        <h2 className="text-xl font-bold text-center">
          {newCar.carName}
          <small
            className="block font-thin text-xs italic -mt-1"
            style={{
              color: newCar?.carColor === "white" ? "black" : newCar?.carColor,
            }}
          >
            {newCar.carColor}
          </small>
        </h2>

        <div className="flex flex-col items-center gap-1 md:gap-3 cursor-pointer hover:opacity-45">
          <a
            href={`https://wa.me/+2348169427948
?text=${encodeURIComponent(
              `Hello! I saw this ${newCar.carName} on your website. I want to make more enquiries about the car`
            )}`}
          >
            <FaWhatsapp color="green" size={25} />
          </a>
        </div>
      </div>
      <ImageSwitcher images={newCar.carImage} name={newCar.carName} />

      <div className="bg-white shadow-xl flex flex-col gap-4  mt-10 rounded-xl p-10 md:place-content-center md:px-[300px]">
        <p className="text-lg text-blue-600 place-content-center font-bold italic">
          {formattedPrice}
        </p>
        <p className="italic text-slate-500">
          Discount:
          <span className="text-[#1B1B1B] ml-2 not-italic font-bold">
            {newCar.discount}%
          </span>
        </p>

        <p className="italic text-slate-500">
          Quantity Availiable:
          <span className="text-[#1B1B1B] ml-2 not-italic font-bold">
            {newCar.quantity}
          </span>
        </p>

        <div className="flex items-center gap-2">
          <img
            src={newCarBrand?.logo}
            alt={`${newCarBrand?.brand} Logo`}
            className="w-6 h-6 md:w-8 md:h-8 rounded-full"
          />
          {newCarBrand?.brand}
        </div>
        <p className="italic text-slate-500">
          Year:
          <span className="text-[#1B1B1B] ml-2 not-italic font-bold">
            {newCar.year}
          </span>
        </p>
        <p className="italic text-slate-500">
          Engine Type:
          <span className="text-[#1B1B1B] ml-2 not-italic font-bold">
            {newCar.engineType}
          </span>
        </p>

        <p className="italic text-slate-500">
          Power Source:
          <span className="text-[#1B1B1B] ml-2 not-italic font-bold">
            {newCar.energyType}
          </span>
        </p>
        <p className="italic text-slate-500">
          Gear Type:
          <span className="text-[#1B1B1B] ml-2 not-italic font-bold">
            {newCar.gearType}
          </span>
        </p>

        <p className="italic text-slate-500">
          Engine Number:
          <span className="text-[#1B1B1B] m not-italic font-bold ml-2">
            {newCar.engineNumber}
          </span>
        </p>

        <p className="italic text-slate-500">
          Description:
          <span className="text-[#1B1B1B] block font-bold not-italic ml-2">
            {newCar.description}
          </span>
        </p>
      </div>
    </div>
  );
};

export default NewCarDetails;
