import { useSelector } from "react-redux";
import CarAssBanner from "./carAssBanner";
import { RootState } from "../../redux/store";
import { CarAss } from "../../../types";
import CarItem from "./carItem";

const CarAssesories = () => {
  const carItem = useSelector(
    (state: RootState) => state.carAss.carItemsData as CarAss[]
  );

  const sortedCarItemData = Array.isArray(carItem)
    ? carItem.slice().sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);

        return dateB.getTime() - dateA.getTime();
      })
    : [];

  return (
    <>
      <CarAssBanner />
      {carItem.length === 0 && (
        <p className="text-center mt-8 font-extrabold text-xl uppercase">
          No Item Available
        </p>
      )}
      <div className="flex w-[100%] flex-wrap justify-center gap-8 px-2 py-4 overflow-x-hidden">
        {sortedCarItemData.length > 0 &&
          sortedCarItemData.map((item) => (
            <CarItem key={item._id} item={item} />
          ))}
      </div>
    </>
  );
};

export default CarAssesories;
