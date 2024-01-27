import React from 'react';
import StatsWidget from '/components/StatsWidget';

const WidgetBar = () => {
  return (
    <div className="w-44 text-center fixed bottom-4 left-1/2 -translate-x-1/2 py-2 rounded-lg text-white font-bold flex justify-center gap-4">
      <StatsWidget />
    </div>
  );
};

export default WidgetBar;
