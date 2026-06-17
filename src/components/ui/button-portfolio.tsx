interface ButtonPortfolioProps {
  types: string[];
  activeFilter: string;
  onFilterChange: (type: string) => void;
}

function ButtonPortfolio({
  types,
  activeFilter,
  onFilterChange,
}: ButtonPortfolioProps) {
  return (
    <div className="mx-auto mb-10 ">
      <div className="flex flex-wrap gap-2 md:gap-3 justify-center ">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => onFilterChange(activeFilter === type ? "All" : type)}
            className={`text-xl md:text-2xl text-center font-semibold border border-orange-500 rounded-full px-5 py-3 cursor-pointer uppercase transition-colors
              ${
                activeFilter === type
                  ? "bg-orange-500 text-white"
                  : "text-orange-500 hover:text-white hover:bg-orange-500"
              }`}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ButtonPortfolio;
