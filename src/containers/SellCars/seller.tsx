import { useSelector } from "react-redux";

import AddUsedCar from "./addUsedCar";
import { RootState } from "../../redux/store";
import { UsedCar as UsedCarType } from "../../../types";
import UsedCar from "./uploadedUsedCar";

const Seller: React.FC<{ userId: string }> = ({ userId }) => {
  const usedCarDataById = useSelector(
    (state: RootState) => state.usedCar.usedCarsDataByUserId as UsedCarType[]
  );

  const sortedUsedCarData = Array.isArray(usedCarDataById)
    ? usedCarDataById.slice().sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);

        return dateB.getTime() - dateA.getTime();
      })
    : [];

  return (
    <div className="py-10">
      <AddUsedCar userId={userId} />
      <h2 className="text-center text-lg md:text-2xl text-blue-600 font-bold">
        List of Your Uploaded Cars
      </h2>
      <div className="flex w-[100%] flex-wrap justify-center gap-8 px-2 py-4 overflow-x-hidden">
        {sortedUsedCarData.length === 0 && (
          <p className="my-10 text-xl font-bold">No Car Uploaded</p>
        )}
        {sortedUsedCarData.length > 0 &&
          sortedUsedCarData.map((item) => (
            <UsedCar key={item._id} item={item} />
          ))}
      </div>
    </div>
  );
};

export default Seller;
