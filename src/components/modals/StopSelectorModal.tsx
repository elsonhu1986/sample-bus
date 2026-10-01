import React, { useState } from 'react';
import { TRANSIT_STOPS, TransitStopContext } from '../../data/transitData';

interface StopSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentStopId: string;
  onSelectStop: (stop: TransitStopContext) => void;
}

export const StopSelectorModal: React.FC<StopSelectorModalProps> = ({
  isOpen,
  onClose,
  currentStopId,
  onSelectStop,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filteredStops = TRANSIT_STOPS.filter(
    (stop) =>
      stop.name.toLowerCase().includes(query.toLowerCase()) ||
      stop.id.includes(query) ||
      stop.locationDesc.toLowerCase().includes(query.toLowerCase()) ||
      stop.mrtConnections.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl border border-[#e4e7ed] overflow-hidden flex flex-col max-h-[85vh]">
        {/* Modal Header */}
        <div className="p-5 border-b border-[#ededf8] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#39126b] text-[22px]">
              near_me
            </span>
            <h3 className="font-['Space_Grotesk'] text-lg font-bold text-[#191b23]">
              Select Transit Stop
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#7b7481] hover:text-[#191b23] hover:bg-black/5 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Search input */}
        <div className="p-4 border-b border-[#ededf8] bg-[#f6f7fa]">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#7b7481] text-[20px]">
              search
            </span>
            <input
              type="text"
              placeholder="Search stop name or 5-digit code..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white rounded-lg text-sm border border-[#e4e7ed] focus:outline-none focus:ring-2 focus:ring-[#502d82]"
              autoFocus
            />
          </div>
        </div>

        {/* Stops list */}
        <div className="p-4 overflow-y-auto space-y-2.5 divide-y divide-[#ededf8]/60">
          {filteredStops.map((stop) => {
            const isSelected = stop.id === currentStopId;

            return (
              <div
                key={stop.id}
                onClick={() => {
                  onSelectStop(stop);
                  onClose();
                }}
                className={`pt-2.5 first:pt-0 p-3 rounded-xl transition-all cursor-pointer flex items-center justify-between gap-3 ${
                  isSelected
                    ? 'bg-[#eddcff]/40 border border-[#c09bf8]'
                    : 'hover:bg-[#f6f7fa]'
                }`}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-[#191b23]">
                      {stop.name}
                    </span>
                    <span className="text-[11px] font-mono bg-[#ededf8] px-2 py-0.5 rounded text-[#39126b] font-bold">
                      {stop.id}
                    </span>
                    {isSelected && (
                      <span className="text-[10px] bg-[#00875a] text-white px-1.5 py-0.2 rounded font-semibold">
                        Current
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-[#4a4450] mt-0.5">
                    {stop.locationDesc} • {stop.berth}
                  </div>
                  <div className="text-[11px] text-[#7b7481] mt-0.5 truncate">
                    {stop.mrtConnections}
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs font-semibold text-[#00875a]">
                    {stop.distanceAway}
                  </span>
                  <div className="text-[11px] text-[#7b7481]">GPS Verified</div>
                </div>
              </div>
            );
          })}

          {filteredStops.length === 0 && (
            <div className="py-8 text-center text-sm text-[#7b7481]">
              No bus stops found matching &quot;{query}&quot;
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
