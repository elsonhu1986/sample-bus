import React from 'react';
import { BusService } from '../data/transitData';

interface DirectionSwitcherProps {
  service: BusService;
  activeDirection: 1 | 2;
  onDirectionChange: (dir: 1 | 2) => void;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  onToggleOccupancyGuide: () => void;
}

export const DirectionSwitcher: React.FC<DirectionSwitcherProps> = ({
  service,
  activeDirection,
  onDirectionChange,
  isBookmarked,
  onToggleBookmark,
  onToggleOccupancyGuide,
}) => {
  return (
    <div className="bg-white rounded-xl p-3 shadow-sm border border-[#e4e7ed] flex flex-col md:flex-row items-center justify-between gap-4">
      {/* Direction Switcher Tabs */}
      <div className="flex items-center w-full md:w-auto bg-[#ededf8] rounded-lg p-1">
        <button
          type="button"
          onClick={() => onDirectionChange(1)}
          className={`flex-1 md:flex-none px-4 py-2 rounded-md text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeDirection === 1
              ? 'bg-[#39126b] text-white shadow-sm font-bold'
              : 'text-[#4a4450] hover:text-[#191b23]'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">arrow_back</span>
          <span>{service.terminals.dir1.name}</span>
          {activeDirection === 1 && (
            <span className="h-2 w-2 rounded-full bg-[#00875a]"></span>
          )}
        </button>

        <button
          type="button"
          onClick={() => onDirectionChange(2)}
          className={`flex-1 md:flex-none px-4 py-2 rounded-md text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeDirection === 2
              ? 'bg-[#39126b] text-white shadow-sm font-bold'
              : 'text-[#4a4450] hover:text-[#191b23]'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          <span>{service.terminals.dir2.name}</span>
          {activeDirection === 2 && (
            <span className="h-2 w-2 rounded-full bg-[#00875a]"></span>
          )}
        </button>
      </div>

      {/* Action Toggles & Save Button */}
      <div className="flex items-center gap-2 w-full md:w-auto justify-end">
        <button
          type="button"
          onClick={onToggleBookmark}
          className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer border ${
            isBookmarked
              ? 'bg-[#eddcff] text-[#280056] border-[#c09bf8]'
              : 'bg-[#f6f7fa] hover:bg-[#ededf8] text-[#191b23] border-[#e4e7ed]'
          }`}
        >
          <span
            className={`material-symbols-outlined text-[18px] ${
              isBookmarked ? 'text-[#39126b] fill-1' : 'text-[#b51c00]'
            }`}
          >
            {isBookmarked ? 'bookmark' : 'bookmark_border'}
          </span>
          <span>{isBookmarked ? 'Saved to My Commute' : 'Save to My Commute'}</span>
        </button>

        <button
          type="button"
          onClick={onToggleOccupancyGuide}
          className="px-3 py-2 rounded-lg bg-[#f6f7fa] hover:bg-[#ededf8] text-xs font-semibold text-[#4a4450] hover:text-[#191b23] flex items-center gap-1.5 transition-colors cursor-pointer border border-[#e4e7ed]"
          title="Singapore LTA Passenger Crowd Standards"
        >
          <span className="material-symbols-outlined text-[18px] text-[#7b7481]">
            info
          </span>
          <span className="hidden sm:inline">Occupancy Guide</span>
        </button>
      </div>
    </div>
  );
};
