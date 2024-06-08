import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import { UsedCar as UsedCarType } from "../../../types";
import { useAppDispatch } from "../../redux/store";
import { statusColor, statusImage, statusName } from "../../utils/carStatus";
import { getOneUsedCarByUserId } from "../../redux/slice/usedCarSlice";
import { scrollToTop } from "../../utils/scrollToTop";

interface JwtPayload {
  UserInfo?: {
    _id: string;
  };
}

const UsedCar: React.FC<{ item: UsedCarType }> = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const accessToken: string | null = localStorage.getItem("accessToken");
  const decodedToken: JwtPayload | null = accessToken
    ? jwtDecode<JwtPayload>(accessToken)
    : null;
  const userId: string | undefined = decodedToken?.UserInfo?._id;

  const handleOneCarDetails = async () => {
    if (item._id && userId) {
      await dispatch(
        getOneUsedCarByUserId({
          usedCarId: item?._id,
          extra: {
            navigate,
          },
        })
      );
    }
    scrollToTop();
  };

  const formattedPrice = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(item?.price);

  return (
    <div className="bg-gray-100 p-4 w-[150px] md:w-[300px] md:max-h-[400px] md:p-8 rounded-md">
      <div className="mb-4">
        <img
          src={item?.carImage && item?.carImage[0]}
          alt={item?.carName}
          className="w-[120px] min-h-[70px] md:w-full max-h-[200px]"
        />
      </div>
      <div className="flex flex-col md:flex-row flex-wrap justify-between gap-3 px-2 w-[250px]">
        <h2
          className="font-bold uppercase text-sm w-[120px] md:max-w-[180px]"
          style={{
            color: item?.carColor === "white" ? "black" : item?.carColor,
          }}
        >
          {item?.carColor} {""} {item.carName}
        </h2>
        <p className="text-blue-700 italic text-[9px] md:text-xs font-semibold">
          {formattedPrice}{" "}
        </p>
        <div className="flex items-center gap-1">
          <img
            src={statusImage[item.status as number]}
            alt=""
            className="md:w-6 md:h-6 w-4 h-4"
          />
          <p
            className="font-semibold text-sm sm:text-base"
            style={{ color: statusColor[item.status as number] }}
          >
            {statusName[item.status as number]}
          </p>
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

export default UsedCar;
