const Search = ({ data, onClick }) => {
  return (
    <div className="flex flex-row gap-2 overflow-x-auto py-3">
      <button
        className="bg-gray-300 rounded-lg p-2 w-full"
        onClick={() => onClick("")} // Pass item._id to the onClick function
      >
        All
      </button>
      {data.map((item) => {
        return (
          <button
            key={item._id}
            className="bg-gray-200 rounded-lg p-2 whitespace-nowrap"
            onClick={() => onClick(item._id)} // Pass item._id to the onClick function
          >
            {item.name}
          </button>
        );
      })}
    </div>
  );
};

export default Search;
