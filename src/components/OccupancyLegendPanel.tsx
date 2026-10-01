import React from 'react';

interface OccupancyLegendPanelProps {
  onClose: () => void;
}

export const OccupancyLegendPanel: React.FC<OccupancyLegendPanelProps> = ({
  onClose,
}) => {
  return (
    <div className="bg-white rounded-xl p-4 sm:p-5 shadow-sm border-l-4 border-l-[#39126b] border border-[#e4e7ed]">
      <div className="flex items-center justify-between mb-3">
        <span className="font-['Space_Grotesk'] text-base sm:text-lg font-bold text-[#191b23]">
          Singapore LTA Real-Time Bus Occupancy Standards
        </span>
        <button
          type="button"
          onClick={onClose}
          className="text-[#4a4450] hover:text-[#191b23] p-1 rounded-md hover:bg-black/5 transition-colors cursor-pointer"
          title="Close guide"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
        {/* Seats Available */}
        <div className="flex items-center gap-3 p-3 rounded-lg bg-[#e3fcef] border border-[#00875a]/20">
          <span className="h-3.5 w-3.5 rounded-full bg-[#00875a] shrink-0 shadow-xs"></span>
          <div>
            <div className="text-xs text-[#191b23] font-bold">Seats Available</div>
            <div className="text-xs text-[#4a4450] mt-0.5">
              Ample seating across lower &amp; upper decks.
            </div>
          </div>
        </div>

        {/* Standing Available */}
        <div className="flex items-center gap-3 p-3 rounded-lg bg-[#fff0d6] border border-[#f58220]/20">
          <span className="h-3.5 w-3.5 rounded-full bg-[#f58220] shrink-0 shadow-xs"></span>
          <div>
            <div className="text-xs text-[#191b23] font-bold">Standing Available</div>
            <div className="text-xs text-[#4a4450] mt-0.5">
              Limited seats remaining, comfortable standing room.
            </div>
          </div>
        </div>

        {/* Limited Standing */}
        <div className="flex items-center gap-3 p-3 rounded-lg bg-[#ffebe6] border border-[#d32f2f]/20">
          <span className="h-3.5 w-3.5 rounded-full bg-[#d32f2f] shrink-0 shadow-xs"></span>
          <div>
            <div className="text-xs text-[#191b23] font-bold">Limited Standing</div>
            <div className="text-xs text-[#4a4450] mt-0.5">
              Near capacity; boarding may be restricted.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
