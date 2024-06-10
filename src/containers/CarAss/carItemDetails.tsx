import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaWhatsapp } from "react-icons/fa";

import { RootState, useAppDispatch } from "../../redux/store";
import { CarAss } from "../../../types";
import ImageSwitcher from "../../utils/imageSwitcher";
import { getOneCarItem } from "../../redux/slice/carAss";

const CarItemDetails = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (itemId) {
      dispatch(
        getOneCarItem({
          itemId,
          extra: {
            navigate,
          },
        })
      );
    }
  }, [itemId, dispatch, navigate]);

  const carItem = useSelector(
    (state: RootState) => state.carAss.oneCarItemData as CarAss
  );

  const formattedPrice = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(carItem?.price);

  return (
    <div className="my-4 mx-3 p-4 bg-gray-200">
      <div className="flex items-center justify-between">
        <FaArrowLeft
          onClick={() => navigate("/car-ass")}
          className="hover:opacity-60 cursor-pointer"
          size={25}
        />
        <h2 className="text-xl font-bold text-center">{carItem.itemName}</h2>

        <div className="flex flex-col items-center gap-1 md:gap-3 cursor-pointer hover:opacity-45">
          <a
            href={`https://wa.me/+2348169427948
?text=${encodeURIComponent(
              `Hello! I saw this ${carItem.itemName} on your website. I want to make more enquiries about the car`
            )}`}
          >
            <FaWhatsapp color="green" size={25} />
          </a>
        </div>
      </div>
      <ImageSwitcher images={carItem.itemImage} name={carItem.itemName} />

      <div className="bg-white shadow-xl flex flex-col gap-4  mt-10 rounded-xl p-10 md:place-content-center md:px-[300px]">
        <p className="text-lg text-blue-600 place-content-center font-bold italic">
          {formattedPrice}
        </p>
        <p className="italic text-slate-500">
          Discount:
          <span className="text-[#1B1B1B] ml-2 not-italic font-bold">
            {carItem.discount}%
          </span>
        </p>

        <p className="italic text-slate-500">
          Quantity Availiable:
          <span className="text-[#1B1B1B] ml-2 not-italic font-bold">
            {carItem.quantity}
          </span>
        </p>

        <p className="italic text-slate-500">
          Description:
          <span className="text-[#1B1B1B] block font-bold not-italic ml-2">
            {carItem.description}
          </span>
        </p>
      </div>
    </div>
  );
};

export default CarItemDetails;
