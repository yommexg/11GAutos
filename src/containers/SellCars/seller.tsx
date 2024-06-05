import { useSelector } from "react-redux";

import AddUsedCar from "./addUsedCar";
import { RootState } from "../../redux/store";
import { UsedCar as UsedCarType } from "../../../types";
import UsedCar from "./uploadedUsedCar";

const Seller: React.FC<{ userId: string }> = ({ userId }) => {
  const usedCarDataById = useSelector(
    (state: RootState) => state.usedCar.usedCarsDataByUserId as UsedCarType[]
  );

  console.log(usedCarDataById);

  return (
    <div className="py-10">
      <AddUsedCar userId={userId} />
      <h2 className="text-center text-lg md:text-2xl text-blue-600 font-bold">
        List of Your Uploaded Cars
      </h2>
      <div className="flex w-[100%] flex-wrap justify-center gap-8 px-2 py-4 overflow-x-hidden">
        {usedCarDataById.length > 0 &&
          usedCarDataById.map((item) => <UsedCar key={item._id} item={item} />)}
      </div>
    </div>
  );
};

export default Seller;
