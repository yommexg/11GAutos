import { FaWhatsapp } from "react-icons/fa";
import { CarAss as CarItemType } from "../../../types";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/store";
import { scrollToTop } from "../../utils/scrollToTop";
import { getOneCarItem } from "../../redux/slice/carAss";

const CarItem: React.FC<{ item: CarItemType }> = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const formattedPrice = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(item?.price);

  const handleOneCarDetails = async () => {
    if (item._id) {
      await dispatch(
        getOneCarItem({
          itemId: item?._id,
          extra: {
            navigate,
          },
        })
      );
      scrollToTop();
    }
  };

  return (
    <div className="bg-gray-100 p-4 w-[150px] md:w-[300px] md:max-h-[400px] md:p-8 rounded-md">
      <div className="mb-4">
        <img
          src={item?.itemImage && item?.itemImage[0]}
          alt={item?.itemName}
          className="w-[120px] min-h-[70px] md:w-full max-h-[200px]"
        />
      </div>
      <div className="flex flex-col md:flex-row flex-wrap justify-between gap-3 px-2 w-[250px]">
        <div>
          <h2 className="font-bold uppercase text-sm w-[120px] md:max-w-[180px]">
            {item?.itemName}
          </h2>
        </div>
        <p className="text-blue-700 italic text-[9px] md:text-xs font-semibold">
          {formattedPrice}{" "}
        </p>
        <div className="flex items-center gap-1 md:gap-3 cursor-pointer hover:opacity-45">
          <a
            href={`https://wa.me/+2348153192058?text=${encodeURIComponent(
              `Hello! I saw this ${item.itemName} on your website. I want to make more enquiries about the car`
            )}`}
          >
            <FaWhatsapp color="green" size={25} />
          </a>
          <p className="text-xs text-gray-400 md:text-base">Message us</p>
        </div>
      </div>

      <button
        onClick={handleOneCarDetails}
        className="mt-4 bg-black py-1 px-4 text-white hover:opacity-70 text-sm"
      >
        View Details
      </button>
    </div>
  );
};

export default CarItem;
