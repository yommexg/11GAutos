const SearchInput = () => {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search..."
        className="border-1 border-gray-700 bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none"
      />
      <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
        <svg
          className="h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-5-5m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
    </div>
  );
};

export default SearchInput;
