import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { UsedCar as UsedCarType } from "../../../types";
import UsedCarBanner from "./usedCarBanner";
import CarFilter from "../../utils/CarFilter";
import UsedCar from "./usedCar";

// Define interface for filter props
interface CarFilterProps {
  brand?: string;
  year?: number;
  fuelType?: string;
  engineType?: string;
}

const UsedCars: React.FC = () => {
  // State for filters
  const [filters, setFilters] = useState<CarFilterProps>({});

  // Handle filter change
  const handleFilterChange = (UsedFilters: CarFilterProps) => {
    setFilters(UsedFilters);
  };

  // Get Used car data from Redux store
  const usedCarData = useSelector(
    (state: RootState) => state.usedCar.usedCarsData as UsedCarType[]
  );

  // Apply filters to Used car data
  const filteredCars =
    usedCarData.length > 0
      ? usedCarData.filter((car) => {
          let isValid = true;

          // Check each filter criterion
          if (filters.brand && filters.brand !== car.carBrand) {
            isValid = false;
          }
          if (filters.year && filters.year !== car.year) {
            isValid = false;
          }
          if (filters.fuelType && filters.fuelType !== car.energyType) {
            isValid = false;
          }
          if (filters.engineType && filters.engineType !== car.engineType) {
            isValid = false;
          }

          return isValid;
        })
      : [];

  const sortedCarData = filteredCars.slice().sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);

    return dateB.getTime() - dateA.getTime();
  });

  return (
    <>
      {/* Used car banner */}
      <UsedCarBanner />

      {/* Car filter component */}
      <CarFilter onFilterChange={handleFilterChange} />

      {/* Display filtered car results */}
      <div className="overflow-y-auto">
        {/* Display message based on filter criteria and results */}
        {filters.brand ||
        filters.engineType ||
        filters.fuelType ||
        filters.year ? (
          filteredCars.length === 0 ? (
            <p className="text-center font-extrabold text-xl uppercase">
              No Cars Available
              <small className="block font-normal text-xs capitalize">
                Change filter to view more products
              </small>
            </p>
          ) : filteredCars.length === 1 ? (
            <p className="text-center font-extrabold text-xl uppercase">
              {filteredCars.length} Car Available
            </p>
          ) : (
            <p className="text-center font-extrabold text-xl uppercase">
              {filteredCars.length} Cars Available
            </p>
          )
        ) : (
          ""
        )}

        {/* Display filtered car items */}
        <div className="flex w-[100%] flex-wrap justify-center gap-8 px-2 py-4 overflow-x-hidden">
          {sortedCarData.length > 0 &&
            sortedCarData.map((item) => <UsedCar key={item._id} item={item} />)}
        </div>
      </div>
    </>
  );
};

export default UsedCars;
