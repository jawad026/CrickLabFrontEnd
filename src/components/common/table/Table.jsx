const Table = ({ column, data, action, onAction, status }) => {
  // Determine whether to enable vertical scrolling
  const enableVerticalScroll = data.length > 7;
  function getTimeStatus(targetTime) {
    // Parse the target time as a Date object
    const targetDate = new Date(targetTime);

    // Get the current time
    const currentDate = new Date();

    // Compare the target time with the current time
    if (targetDate > currentDate) {
      return "upcoming";
    } else if (targetDate.getDate() === currentDate.getDate()) {
      return "live";
    } else {
      return "previous";
    }
  }
  function fetchByDotOperator(object, value) {
    return value.split(".").reduce((acc, curr) => acc[curr], object);
  }
  return (
    <div
      className={`relative ${
        enableVerticalScroll ? "max-h-[500px] overflow-y-auto" : ""
      } shadow-md sm:rounded-lg`}
    >
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              ID
            </th>
            {column.map((item, i) => {
              return (
                <th key={i} scope="col" className="px-6 py-3">
                  {item.name.split(".")[0]}
                </th>
              );
            })}
            {status && (
              <th scope="col" className="px-6 py-3">
                STATUS
              </th>
            )}
            {action && (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody className="">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {rowIndex}
              </td>
              {column.map((column, colIndex) => (
                <td
                  key={colIndex}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                >
                  {fetchByDotOperator(row, column.name)}
                </td>
              ))}
              {status && (
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {getTimeStatus(row.datetime)}
                </td>
              )}

              {action && (
                <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                  <button
                    onClick={() => onAction(row)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Edit
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
