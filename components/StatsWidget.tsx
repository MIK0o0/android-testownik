import React, { useContext } from 'react';
import { StatsTrackerContext } from '/providers/StatsTrackerProvider';

const StatsWidget = () => {
  const { stats, percentage } = useContext(StatsTrackerContext);

  return (
    <div className="w-44 text-center bg-purple-600 py-2 rounded-lg text-white font-bold border-[1px] border-white shadow-xl flex justify-around">
      <p>{stats}</p>
      <p>
        {percentage} {parseInt(percentage.replace('%', '')) >= 50 ? '😎' : '💀'}
      </p>
    </div>
  );
};

export default StatsWidget;
