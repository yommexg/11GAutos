import { useSelector } from "react-redux";
import CarAssBanner from "./carAssBanner";
import { RootState } from "../../redux/store";
import { CarAss } from "../../../types";
import CarItem from "./carItem";

const CarAssesories = () => {
  const carItem = useSelector(
    (state: RootState) => state.carAss.carItemsData as CarAss[]
  );

  return (
    <>
      <CarAssBanner />
      {carItem.length === 0 && (
        <p className="text-center font-extrabold text-xl uppercase">
          No Item Available
          {/* <small className="block font-normal text-xs capitalize">
            Change filter to view more products
          </small> */}
        </p>
      )}
      <div className="flex w-[100%] flex-wrap justify-center gap-8 px-2 py-4 overflow-x-hidden">
        {carItem.length > 0 &&
          carItem.map((item) => <CarItem key={item._id} item={item} />)}
      </div>
    </>
  );
};

export default CarAssesories;
