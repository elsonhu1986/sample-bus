import React, { useState } from 'react';
import { BusService } from '../../data/transitData';

interface AllStopsModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: BusService;
}

export const AllStopsModal: React.FC<AllStopsModalProps> = ({
  isOpen,
  onClose,
  service,
}) => {
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  const currentTerminus =
    service.currentDirection === 1
      ? service.terminals.dir1.terminus
      : service.terminals.dir2.terminus;

  const stops = service.upcomingStops;
  const filtered = stops.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.id.includes(search) ||
      s.road.toLowerCase().includes(search.toLowerCase()) ||
      (s.mrtCode && s.mrtCode.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="bg-white rounded-2xl w-full max-w-xl shadow-2xl border border-[#e4e7ed] overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-5 border-b border-[#ededf8] flex items-center justify-between bg-[#faf8ff]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#39126b] text-white flex items-center justify-center font-['Space_Grotesk'] text-lg font-bold">
              {service.serviceNo}
            </div>
            <div>
              <h3 className="font-['Space_Grotesk'] text-lg font-bold text-[#191b23]">
                Bus {service.serviceNo} Full Route
              </h3>
              <p className="text-xs text-[#4a4450]">
                To {currentTerminus} • {service.totalStops} Stops Total
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#7b7481] hover:text-[#191b23] hover:bg-black/5 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Filter input */}
        <div className="p-4 border-b border-[#ededf8] bg-[#f6f7fa]">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#7b7481] text-[20px]">
              search
            </span>
            <input
              type="text"
              placeholder="Search stop or MRT station..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white rounded-lg text-sm border border-[#e4e7ed] focus:outline-none focus:ring-2 focus:ring-[#502d82]"
            />
          </div>
        </div>

        {/* Stops Timeline */}
        <div className="p-5 overflow-y-auto space-y-4">
          <div className="relative pl-6 space-y-4 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-3 before:w-0.5 before:bg-[#e7e7f3]">
            {filtered.map((stop, index) => {
              const isFirst = index === 0;

              return (
                <div
                  key={stop.id}
                  className="relative flex items-center justify-between group"
                >
                  {/* Pin Dot */}
                  {isFirst ? (
                    <div className="absolute -left-6 top-1 h-4 w-4 rounded-full bg-[#39126b] border-4 border-white shadow-sm ring-2 ring-[#39126b]/30"></div>
                  ) : (
                    <div className="absolute -left-6 top-1 h-4 w-4 rounded-full bg-[#e1e1ed] border-2 border-white group-hover:bg-[#39126b] transition-colors"></div>
                  )}

                  {/* Stop detail */}
                  <div>
                    <div className="text-xs font-bold text-[#191b23] flex items-center gap-1.5 flex-wrap">
                      <span className={isFirst ? 'text-[#39126b]' : 'text-[#191b23]'}>
                        {stop.name}
                      </span>
                      <span className="text-[10px] font-mono text-[#7b7481]">
                        ({stop.id})
                      </span>

                      {isFirst && (
                        <span className="px-1.5 py-0.2 bg-[#39126b]/10 text-[#39126b] text-[10px] rounded font-bold">
                          Current Boarding
                        </span>
                      )}

                      {stop.mrtCode && (
                        <span className="px-1.5 py-0.2 rounded bg-[#e3dfff] text-[#181542] text-[9px] font-bold">
                          {stop.mrtCode}
                        </span>
                      )}
                    </div>

                    <div className="text-xs text-[#4a4450] mt-0.5">
                      {stop.road} {stop.berth ? `• ${stop.berth}` : ''}
                    </div>
                  </div>

                  {/* Offset */}
                  <span
                    className={`text-xs font-bold shrink-0 ml-2 ${
                      isFirst ? 'text-[#00875a]' : 'text-[#4a4450]'
                    }`}
                  >
                    {isFirst ? 'Departing' : `+${stop.etaOffsetMinutes}m`}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#ededf8] bg-[#faf8ff] flex items-center justify-between text-xs text-[#4a4450]">
          <span>Integrated LTA Master Data 2025</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#39126b] text-white rounded-lg font-semibold hover:bg-[#502d82] transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
