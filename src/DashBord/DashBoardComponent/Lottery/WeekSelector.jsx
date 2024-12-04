
const WeekSelector = ({ selectedWeek, onWeekChange }) => {
  return (
    <select
      value={selectedWeek}
      onChange={(e) => onWeekChange(e.target.value)}
      className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
    >
      <option value="current">Current Week</option>
      <option value="previous">Previous Week</option>
    </select>
  );
};

export default WeekSelector;