import { useState } from "react";
import { brands } from "./carBrands";

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 30 }, (_, i) => ({
  value: currentYear - i,
  label: (currentYear - i).toString(),
}));

const fuelTypes = ["Diesel", "Electric", "Petrol"];

const engineTypes = ["V3", "V4", "v5", "V6", "V8", "V10", "V12"];

interface FilterProps {
  // Define props for filtering data (if applicable)
  onFilterChange?: (filters: {
    brand?: string;
    year?: number;
    fuelType?: string;
    engineType?: string;
  }) => void;
}

const Filter: React.FC<FilterProps> = ({ onFilterChange }) => {
  const [selectedBrand, setSelectedBrand] = useState<string | undefined>();
  const [selectedYear, setSelectedYear] = useState<number | undefined>();
  const [selectedFuelType, setSelectedFuelType] = useState<
    string | undefined
  >();
  const [selectedEngineType, setSelectedEngineType] = useState<
    string | undefined
  >();

  const [selectedBrandLogo, setSelectedBrandLogo] = useState("");

  const sortedBrands = brands
    .slice()
    .sort((a, b) => a.brand.localeCompare(b.brand));

  const handleBrandChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedBrand = event.target.value;
    setSelectedBrand(selectedBrand);
    const brand = brands.find((item) => item.brand === selectedBrand);
    if (brand) {
      setSelectedBrandLogo(brand.logo);
    }
    if (onFilterChange) {
      onFilterChange({
        brand: event.target.value,
        year: selectedYear,
        fuelType: selectedFuelType,
        engineType: selectedEngineType,
      });
    }
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedYear = event.target.value
      ? parseInt(event.target.value)
      : undefined;
    setSelectedYear(selectedYear);
    if (onFilterChange) {
      onFilterChange({
        brand: selectedBrand,
        year: parseInt(event.target.value),
        fuelType: selectedFuelType,
        engineType: selectedEngineType,
      });
    }
  };

  const handleFuelTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedFuelType(event.target.value);
    if (onFilterChange) {
      onFilterChange({
        brand: selectedBrand,
        year: selectedYear,
        fuelType: event.target.value,
        engineType: selectedEngineType,
      });
    }
  };

  const handleEngineTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedEngineType(event.target.value);
    if (onFilterChange) {
      onFilterChange({
        brand: selectedBrand,
        year: selectedYear,
        fuelType: selectedFuelType,
        engineType: event.target.value,
      });
    }
  };

  return (
    <div className="px-4  py-8">
      <h2 className="text-center text-[#1B1B1B] font-bold text-3xl mb-8">
        Filter Cars
      </h2>
      <div className="flex flex-wrap items-center gap-5 justify-between md:px-20 lg:px-32">
        <div className="flex items-center w-[200px]">
          <label htmlFor="brand-select" className="mr-2">
            Brand:
          </label>
          <div className="flex gap-2 items-center">
            {selectedBrand && selectedBrandLogo && (
              <img
                src={selectedBrandLogo}
                alt={`${selectedBrand} Logo`}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full"
              />
            )}
            <select
              id="brand-select"
              value={selectedBrand}
              onChange={handleBrandChange}
              className="p-2"
            >
              <option value="">Filter By Brands</option>
              {sortedBrands.map((brand) => (
                <option key={brand.brand} value={brand.brand}>
                  {brand.brand}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="w-[200px]">
          <label htmlFor="year-select" className="mr-2">
            Year:
          </label>
          <select
            id="year-select"
            value={selectedYear}
            onChange={handleYearChange}
            className="border rounded-md px-2 py-1"
          >
            <option value="">Filter by Year</option>

            {years.map((year) => (
              <option key={year.value} value={year.value}>
                {year.label}
              </option>
            ))}
          </select>
        </div>
        <div className="w-[250px]">
          <label htmlFor="fuel-type-select" className="mr-2">
            Fuel Type:
          </label>
          <select
            id="fuel-type-select"
            value={selectedFuelType}
            onChange={handleFuelTypeChange}
            className="border rounded-md px-2 py-1"
          >
            <option value="">Filter by Fuel</option>

            {fuelTypes.map((fuelType) => (
              <option key={fuelType} value={fuelType}>
                {fuelType}
              </option>
            ))}
          </select>
        </div>
        <div className="w-[250px]">
          <label htmlFor="engine-type-select" className="mr-2">
            Engine Type:
          </label>
          <select
            id="engine-type-select"
            value={selectedEngineType}
            onChange={handleEngineTypeChange}
            className="border rounded-md px-2 py-1"
          >
            <option value="">Filter by Engine</option>

            {engineTypes.map((engineType) => (
              <option key={engineType} value={engineType}>
                {engineType}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filter;
