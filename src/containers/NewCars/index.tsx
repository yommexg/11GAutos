import { useSelector } from "react-redux";

import NewCarBanner from "./newCarBanner";
import { NewCar as NewCarType } from "../../../types";
import CarFilter from "../../utils/CarFilter";
import { RootState } from "../../redux/store";
import NewCar from "./newCar";

const NewCars = () => {
  const newCarData = useSelector(
    (state: RootState) => state.newCar.newCarsData as NewCarType[]
  );

  console.log(newCarData);
  return (
    <>
      <NewCarBanner />
      <CarFilter />
      <div className="overflow-y-auto">
        <div className="flex w-[100%] flex-wrap justify-center gap-8 px-2 py-4 overflow-x-hidden">
          {newCarData.length > 0 &&
            newCarData?.map((item) => <NewCar key={item._id} item={item} />)}
        </div>
      </div>
    </>
  );
};

export default NewCars;
